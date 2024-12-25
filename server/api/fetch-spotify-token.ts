export default defineEventHandler(async (event) => {
  const spotifyClientID = process.env.SPOTIFY_CLIENT_ID;
  const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!spotifyClientID || !spotifyClientSecret) {
    console.error('Credentials are not set');
    throw new Error(
      'Spotify credentials are not set in environment variables.'
    );
  }
  // Need to set this to the rfresh_token method eventually.
  // This works. ^TM
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', spotifyClientID);
  params.append('client_secret', spotifyClientSecret);

  try {
    const data = await $fetch('api/token/', {
      method: 'POST',
      baseURL: 'https://accounts.spotify.com/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    return data as SpotifyToken;
  } catch (error: any) {
    console.error('Error fetching Spotify song:', error);
    throw new Error('Failed to fetch song');
  }
});
