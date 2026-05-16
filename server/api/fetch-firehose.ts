import type { Firehose, FirehoseData, BlogPost } from '~/types/firehose';

export default defineEventHandler(async (event) => {
  const FIREHOSE_API_URL = 'https://firehose.a4e.workers.dev/api/v1/';

  try {
    // Fetch data from the external firehose API
    const response = await fetch(FIREHOSE_API_URL, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Adam4ever-Nuxt-SSR'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Firehose fetch failed: ${response.status} ${response.statusText}`,
        errorText
      );
      throw new Error(
        `External API returned ${response.status}: ${errorText.substring(0, 100)}`
      );
    }

    const firehoseData: Firehose = await response.json();

    // Fetch data from Nuxt Content v3 internally
    let blogs = await queryCollection(event, 'blog').all();

    // Ignore draft posts
    blogs = blogs.filter((blog) => !blog.draft);

    // Fetch dictionary words from D1
    const db = event.context.cloudflare?.env?.A4E;
    let dictionaryWords: any[] = [];
    if (db) {
      try {
        const { results } = await db.prepare('SELECT word, data, audio_data, created_at FROM dictionary_entries ORDER BY created_at DESC LIMIT 50').all();
        if (results) {
          dictionaryWords = results.map((row: any) => ({
            id: row.word,
            word: row.word,
            data: JSON.parse(row.data as string),
            audio_data: row.audio_data,
            created_at: row.created_at,
            meta: {
              source: 'dictionary',
              category: 'dictionary'
            }
          }));
        }
      } catch (err) {
        console.error('Failed to fetch dictionary words from D1:', err);
      }
    }

    // Merge and sort data by created_at
    const mergedData = [
      ...blogs.map((blog) => ({
        ...blog,
        meta: {
          source: 'blog',
          category: 'blog'
        },
        created_at: blog.date || blog.meta?.date || new Date().toISOString()
      })),
      ...firehoseData.data.map((item) => ({
        ...item
      })),
      ...dictionaryWords
    ].sort(
      (a, b) =>
        new Date(b.created_at as string).getTime() -
        new Date(a.created_at as string).getTime()
    );

    return mergedData as FirehoseData;
  } catch (error: any) {
    // Handle errors with detailed logging for debugging
    console.error('Firehose fetch error:', error);
    return {
      error: 'Failed to fetch data',
      message: error.message,
      name: error.name
    };
  }
});
