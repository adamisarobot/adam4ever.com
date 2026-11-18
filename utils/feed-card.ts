import type { Post } from '../types/firehose.d.ts';

function isSource<Source extends Post['meta']['source']>(
  post: Post,
  source: Source
): post is Extract<Post, { meta: { source: Source } }> {
  return post.meta.source === source;
}

// Narrow the whole record, preserving each card's existing prop contract.
export function getFeedCard(post: Post) {
  if (isSource(post, 'blog')) {
    return { source: 'blog' as const, props: { post } };
  }
  if (isSource(post, 'bluesky')) {
    return { source: 'bluesky' as const, props: { post } };
  }
  if (isSource(post, 'tmdb')) {
    return { source: 'tmdb' as const, props: { movie: post } };
  }
  if (isSource(post, 'hardcover')) {
    return { source: 'hardcover' as const, props: { book: post } };
  }
  return null;
}
