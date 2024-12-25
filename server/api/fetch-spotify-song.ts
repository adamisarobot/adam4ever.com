import formatData from '~/utils/format-data';

export default defineEventHandler(async (event) => {
  // Hardcoded for now, 'Rough and Tumble' playlist
  // Trying to retrieve the last track, 'King of the Sea'
  const playlistId = '1WiL8TG52iHLj1RJWyJxHT';

  const token = await $fetch<SpotifyToken>('/api/fetch-spotify-token');
  const accessToken = token.access_token;

  // Fetch playlist tracks
  const playlistTracks = await $fetch<SpotifyPlaylistTracks>(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Return the last track in the playlist
  const lastTrack = playlistTracks.items.pop();
  if (!lastTrack) {
    return;
  }

  return formatData.spotifyTrack(lastTrack);
});
