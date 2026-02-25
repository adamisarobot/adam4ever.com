export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = query.url as string;

  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'URL is required'
    });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `Failed to fetch URL: ${response.statusText}`
      });
    }

    const html = await response.text();

    // Basic Regex for efficiency (avoiding heavy DOM parsers if possible)
    const getMetaContent = (name: string) => {
      const regex = new RegExp(
        `<meta\\s+(?:name|property)=["']${name}["']\\s+content=["'](.*?)["']`,
        'i'
      );
      const match = html.match(regex);
      return match ? match[1] : null;
    };

    const getTitle = () => {
      const regex = /<title>(.*?)<\/title>/i;
      const match = html.match(regex);
      return match ? match[1] : null;
    };

    const title = getMetaContent('og:title') || getTitle() || '';
    const rawDescription =
      getMetaContent('og:description') || getMetaContent('description') || '';
    const image = getMetaContent('og:image') || '';
    console.log('raw', rawDescription);
    const description = decodeURIComponent(rawDescription);
    console.log('description', description);

    return {
      title,
      description,
      image,
      url
    };
  } catch (error: any) {
    console.error('Metadata fetch error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch metadata: ${error.message}`
    });
  }
});
