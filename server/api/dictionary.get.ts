import { consola } from 'consola';

// In-memory cache for in-flight requests to prevent hammering the external API
// when multiple identical concurrent requests are received.
const inflightRequests = new Map<string, Promise<any>>();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const word = query.word as string;

  if (!word) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Word parameter is required'
    });
  }

  const logger = consola.withTag('dictionary');
  const db = event.context.cloudflare.env.A4E;
  const normalizedWord = word.toLowerCase().trim();

  // Deduplicate concurrent requests
  if (inflightRequests.has(normalizedWord)) {
    logger.info(`Waiting for in-flight request for: ${normalizedWord}`);
    return inflightRequests.get(normalizedWord);
  }

  const fetchPromise = (async () => {
    try {
      // 1. Check local D1 database
      const { results } = await db.prepare('SELECT data, audio_data, created_at FROM dictionary_entries WHERE word = ?').bind(normalizedWord).all();

      if (results && results.length > 0) {
        logger.info(`Cache hit for word: ${normalizedWord}`);
        return {
          data: JSON.parse(results[0]?.data as string),
          audio_data: results[0]?.audio_data,
          created_at: results[0]?.created_at
        };
      }

      // 2. Not found in cache, fetch from external API
      logger.info(`Fetching definition for: ${normalizedWord} from external API`);
      const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(normalizedWord)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        if (response.status === 404) {
          throw createError({
            statusCode: 404,
            statusMessage: `No definition found for word: ${normalizedWord}`
          });
        }
        throw createError({
          statusCode: response.status,
          statusMessage: `External API error: ${response.statusText}`
        });
      }

      const jsonData = await response.json();

      // 3. Extract audio URL if available
      let audioUrl = '';
      if (Array.isArray(jsonData) && jsonData[0] && Array.isArray(jsonData[0].phonetics)) {
        const phoneticWithAudio = jsonData[0].phonetics.find((p: any) => p.audio && p.audio.length > 0);
        if (phoneticWithAudio) {
          audioUrl = phoneticWithAudio.audio;
        }
      }

      // 4. Download and Base64 encode the audio
      let audioData = null;
      if (audioUrl) {
        try {
          const audioRes = await fetch(audioUrl);
          if (audioRes.ok) {
            const arrayBuffer = await audioRes.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString('base64');
            audioData = `data:audio/mpeg;base64,${base64}`;
          } else {
            logger.warn(`Failed to fetch audio from ${audioUrl}`);
          }
        } catch (audioError) {
          logger.error(`Error downloading audio for ${normalizedWord}:`, audioError);
        }
      }

      // 5. Store in D1 database using INSERT OR IGNORE to gracefully handle any race conditions
      // that might somehow still occur or get past the inflight deduping.
      try {
        await db.prepare('INSERT OR IGNORE INTO dictionary_entries (word, data, audio_data) VALUES (?, ?, ?)')
          .bind(normalizedWord, JSON.stringify(jsonData), audioData)
          .run();
        logger.success(`Cached word: ${normalizedWord} in D1`);
      } catch (dbError) {
        logger.error(`Error caching word ${normalizedWord} in D1:`, dbError);
        // We don't fail the request if caching fails
      }

      // 6. Return response
      return {
        data: jsonData,
        audio_data: audioData,
        created_at: new Date().toISOString()
      };

    } catch (error: any) {
      if (error.statusCode) throw error;
      logger.error(`Unexpected error for ${normalizedWord}:`, error);
      throw createError({
        statusCode: 500,
        statusMessage: `Internal server error: ${error.message}`
      });
    } finally {
      // Always clear the inflight request when done or on error
      inflightRequests.delete(normalizedWord);
    }
  })();

  // Track the inflight request
  inflightRequests.set(normalizedWord, fetchPromise);

  return fetchPromise;
});
