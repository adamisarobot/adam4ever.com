export default defineEventHandler(async (event) => {
  const tmdbAPIKEY = process.env.TMDB_API_KEY;
  if (!tmdbAPIKEY) {
    console.error('Credentials are not set');
    throw new Error('TMDB credentials are not set in environment variables.');
  }

  try {
    const data = await $fetch(`/3/authentication`, {
      method: 'GET',
      baseURL: 'https://api.themoviedb.org',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tmdbAPIKEY}`,
      },
    });
    console.log(data);
    return data;
  } catch (error: any) {
    console.error('Error fetching TMDB:', error);
    throw new Error('Failed to fetch movies');
  }
});
