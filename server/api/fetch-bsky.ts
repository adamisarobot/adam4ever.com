import { BskyAgent, AppBskyFeedGetAuthorFeed } from '@atproto/api';

export default defineEventHandler(
  async (event): Promise<AppBskyFeedGetAuthorFeed.Response['data']['feed']> => {
    const blueskyHandle = process.env.BLUESKY_HANDLE;
    const blueskyPassword = process.env.BLUESKY_PASSWORD;

    if (!blueskyHandle || !blueskyPassword) {
      throw new Error(
        'Bluesky credentials are not set in environment variables.'
      );
    }

    try {
      const agent = new BskyAgent({ service: 'https://bsky.social' });
      await agent.login({
        identifier: blueskyHandle,
        password: blueskyPassword,
      });
      const response = await agent.getAuthorFeed({
        actor: blueskyHandle,
        filter: 'posts_and_author_threads',
        limit: 30,
      });

      return response.data.feed;
    } catch (error: any) {
      console.error('Error fetching Bluesky posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }
);
