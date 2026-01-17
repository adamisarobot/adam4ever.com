import type { Firehose, FirehoseData, BlogPost } from '~/types/firehose';
import { serverQueryContent } from '#content/server';

export default defineEventHandler(async (event) => {
  const FIREHOSE_API_URL = 'https://firehose.a4e.workers.dev/api/v1/';

  try {
    // Fetch data from the external firehose API
    const response = await fetch(FIREHOSE_API_URL, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Adam4ever-Nuxt-SSR'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Firehose fetch failed: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`External API returned ${response.status}: ${errorText.substring(0, 100)}`);
    }

    const firehoseData: Firehose = await response.json();

    // Fetch data from Nuxt Content internally
    const blogs = await serverQueryContent(event).find();

    // Merge and sort data by created_at
    const mergedData = [
      ...blogs.map((blog) => ({
        ...blog,
        meta: {
          source: 'blog',
          category: 'blog'
        },
        created_at: blog?.date || blog?.created_at
      })),
      ...firehoseData.data.map((item) => ({
        ...item
      }))
    ].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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
