export default defineEventHandler(async (event) => {
  const hardCoverAPIKey = process.env.HARDCOVER_API_KEY;
  if (!hardCoverAPIKey) {
    console.error('Credentials are not set');
    throw new Error(
      'Hardcover credentials are not set in environment variables.'
    );
  }

  const query = `
    {
      me {
        user_books(where: {status_id: {_eq: 2}}) {
          rating
          book {
            title
          }
        }
      }
    }
  `;

  try {
    const data = await $fetch(`/graphql`, {
      method: 'POST',
      baseURL: 'https://api.hardcover.com',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${hardCoverAPIKey}`,
      },
      body: JSON.stringify({ query }),
    });

    console.log('Res', data);
    // const data = await response.json();

    // return data;
  } catch (error: any) {
    console.error('Error fetching Hardcover books:', error);
    throw new Error('Failed to fetch books');
  }
});
