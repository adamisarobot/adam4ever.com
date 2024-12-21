export default defineEventHandler(async (event) => {
  const tmdbAPIKEY = process.env.TMDB_API_KEY;
  const tmdbAccountID = process.env.TMDB_ACCOUNT_ID;

  if (!tmdbAPIKEY || !tmdbAccountID) {
    console.error('Credentials are not set');
    throw new Error('TMDB credentials are not set in environment variables.');
  }

  // There is an opporunity to create a wrapper? composible for different data fetches.
  const favourite = {
    language: 'en-US',
    page: 1,
    sort_by: 'created_at.asc',
  };

  try {
    const data = await $fetch(`/favorite/movies`, {
      method: 'GET',
      baseURL: `https://api.themoviedb.org/3/account/${tmdbAccountID}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tmdbAPIKEY}`,
      },
    });

    return data;
  } catch (error: any) {
    console.error('Error fetching TMDB:', error);
    throw new Error('Failed to fetch movies');
  }
});
