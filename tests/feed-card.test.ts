import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { Post } from '../types/firehose.d.ts';
import { getFeedCard } from '../utils/feed-card.ts';

for (const [source, prop] of [
  ['blog', 'post'],
  ['bluesky', 'post'],
  ['tmdb', 'movie'],
  ['hardcover', 'book']
] as const) {
  test(`${source} selects its card and passes the original record as ${prop}`, () => {
    // Only routing metadata is needed; card content belongs to the component.
    const post = { id: 1, meta: { source, category: source } } as Post;
    const card = getFeedCard(post);
    assert.ok(card);
    assert.equal(card.source, source);
    assert.deepEqual(Object.keys(card.props), [prop]);
    assert.equal(Object.values(card.props)[0], post);
  });
}

test('an unsupported upstream source does not select a card', () => {
  const post = { meta: { source: 'spotify' } } as unknown as Post;
  assert.equal(getFeedCard(post), null);
});
