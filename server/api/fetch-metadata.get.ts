import { load } from 'cheerio';
import { consola } from 'consola';

export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event);
    const url = query.url as string;

    if (!url) {
      throw createError({
        statusCode: 400,
        statusMessage: 'URL is required'
      });
    }

    const logger = consola.withTag('metadata');
    logger.info(`Fetching: ${url}`);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        logger.warn(`Failed to fetch ${url}: ${response.status}`);
        throw createError({
          statusCode: response.status,
          statusMessage: `Failed to fetch URL: ${response.statusText}`
        });
      }

      const html = await response.text();
      const $ = load(html);

      const getMeta = (name: string) => {
        return (
          $(`meta[property="${name}"]`).attr('content') ||
          $(`meta[name="${name}"]`).attr('content') ||
          null
        );
      };

      const title = getMeta('og:title') || $('title').text() || '';
      const description = getMeta('og:description') || getMeta('description') || '';
      const image = getMeta('og:image') || '';
      const siteName = getMeta('og:site_name') || '';

      logger.success(`Resolved: ${title || url}`);

      return {
        title: title.trim(),
        description: description.trim(),
        image,
        siteName: siteName.trim(),
        url
      };
    } catch (error: any) {
      logger.error(`Error for ${url}:`, error.message);
      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: `Failed to fetch metadata: ${error.message}`
      });
    }
  },
  {
    maxAge: 60 * 60, // 1 hour
    name: 'fetch-metadata',
    getKey: (event) => {
      const query = getQuery(event);
      return query.url as string;
    }
  }
);
