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
          book {
            title
            subtitle
            rating
            cached_contributors
            book_series {
              id
              position
              series {
                name
              }
            }
            cached_image
          }
          date_added
        }
      }
    }
  `;

  try {
    const data = await $fetch(`/v1/graphql`, {
      method: 'POST',
      baseURL: 'https://api.hardcover.app/',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${hardCoverAPIKey}`,
      },
      body: JSON.stringify({ query }),
    });

    return data;
  } catch (error: any) {
    console.error('Error fetching Hardcover books:', error);
    throw new Error('Failed to fetch books');
  }
});
