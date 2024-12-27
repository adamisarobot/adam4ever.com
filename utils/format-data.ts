import type { AppBskyFeedGetAuthorFeed } from '@atproto/api';

const spotifyTrack = (playlistTrack: SpotifyPlaylistTrack) => {
  const track = playlistTrack.track;
  if (!track) return;

  return {
    id: track.id,
    name: track.name,
    artists: track.artists,
    album: track.album.name,
    album_art: track.album.images,
    external_url: track.external_urls.spotify,
  };
};

const bskyPost = (post: AppBskyFeedGetAuthorFeed.Response['data']['feed']) => {
  if (!post) return;

  const internal = post[0].post;
  const author = internal.author;
  const record = internal.record;

  const bPost: BskyPost = {
    author: {
      avatar: author.avatar,
      displayName: author.displayName,
      handle: author.handle,
    },
    record: {
      text: record.text,
      createdAt: record.createdAt,
    },
  };

  return bPost;
};

export default {
  spotifyTrack,
  bskyPost,
};
