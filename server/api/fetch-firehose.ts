import type { Firehose, FirehoseData, BlogPost } from '~/types/firehose';
export default defineEventHandler(async () => {
  const FIREHOSE_API_URL = 'https://firehose.a4e.workers.dev/api/v1/';

  try {
    // Fetch data from the firehose API
    const firehoseData: Firehose = await $fetch(FIREHOSE_API_URL);
    // Fetch data from Nuxt Content
    const blogs = await $fetch('/api/_content/query');

    // Merge and sort data by created_at
    const mergedData = [
      ...blogs.map((blog: BlogPost) => ({
        ...blog,
        meta: {
          source: 'blog',
          category: 'blog'
        },
        created_at: blog?.date
      })),
      ...firehoseData.data.map((item) => ({
        ...item
      }))
    ].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return mergedData as FirehoseData;
  } catch (error: unknown) {
    // Handle errors
    return { error: 'Failed to fetch data', details: error };
  }
});
