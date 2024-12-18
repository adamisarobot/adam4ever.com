// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  devtools: { enabled: true },
  googleFonts: {
    families: {
      Arvo: {
        wght: [700],
        ital: [700],
      },
      'Open+Sans': {
        wght: [400, 700],
        ital: [400, 700],
      },
      'Space+Grotesk': {
        wght: [500],
      },
    },
  },

  modules: ['@nuxt/content', '@nuxtjs/google-fonts', '@nuxthub/core'],

  routeRules: {
    '/': { prerender: true },
  },

  runtimeConfig: {
    public: {},
    private: {
      blueskyHandle: process.env.BLUESKY_HANDLE,
      blueskyPassword: process.env.BLUESKY_PASSWORD,
      hardCoverAPIKey: process.env.HARDCOVER_API_KEY,
    },
  },

  ssr: true,
  compatibilityDate: '2024-12-04',
});
