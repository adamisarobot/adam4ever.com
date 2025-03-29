import { BskyAgent, AppBskyFeedGetAuthorFeed } from '@atproto/api';
import formatter from '~/utils/format-data';

export default defineEventHandler(async (event): Promise<BskyPost> => {
  const blueskyHandle = process.env.BLUESKY_HANDLE;
  const blueskyPassword = process.env.BLUESKY_PASSWORD;

  if (!blueskyHandle || !blueskyPassword) {
    console.error('Credentials are not set');
    throw new Error(
      'Bluesky credentials are not set in environment variables.'
    );
  }

  try {
    const agent = new BskyAgent({ service: 'https://bsky.social' });
    await agent.login({
      identifier: blueskyHandle,
      password: blueskyPassword
    });

    const response = await agent.getAuthorFeed({
      actor: blueskyHandle,
      filter: 'posts_and_author_threads',
      limit: 30
    });

    const formattedReturn = formatter.bskyPost(response.data.feed);

    if (!formattedReturn) {
      throw new Error('Failed to format Bluesky posts');
    }

    return formattedReturn;
  } catch (error: any) {
    console.error('Error fetching Bluesky posts:', error);
    throw new Error('Failed to fetch posts');
  }
});
