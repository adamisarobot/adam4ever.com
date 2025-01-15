// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: `https://adam4ever.com/` },
      ],
    },
  },
  components: true,

  devtools: { enabled: true },
  googleFonts: {
    families: {
      Arvo: {
        wght: [400, 700],
        ital: [400, 700],
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

  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@nuxthub/core',
    '@nuxt/image',
    '@nuxtjs/color-mode',
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage',
    dataValue: 'theme',
  },

  routeRules: {
    '/': { prerender: true },
  },

  runtimeConfig: {
    public: {},
    private: {
      blueskyHandle: process.env.BLUESKY_HANDLE,
      blueskyPassword: process.env.BLUESKY_PASSWORD,
      hardCoverAPIKey: process.env.HARDCOVER_API_KEY,
      tmdbAPIKEY: process.env.TMDB_API_KEY,
      tmdbAccountID: process.env.TMDB_ACCOUNT_ID,
      spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
      spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    },
  },

  ssr: true,
  compatibilityDate: '2024-12-04',
});
