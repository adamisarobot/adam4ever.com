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

const bskyPost = (post: any) => {
  if (!post) return;

  return {
    post,
  };
};

export default {
  spotifyTrack,
  bskyPost,
};
