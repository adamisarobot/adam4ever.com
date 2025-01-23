// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: `https://adam4ever.com/` }
      ]
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage',
    dataValue: 'theme'
  },

  components: true,

  devtools: { enabled: true },

  fonts: {
    families: [
      { name: 'Zodiac', provider: 'fontshare', weights: ['700'], preload: true }
    ]
  },

  modules: [
    '@nuxt/content',
    '@nuxthub/core',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/robots',
    '@nuxtjs/cloudinary',
    '@nuxt/fonts'
  ],

  robots: {
    blockAiBots: true
  },

  routeRules: {
    '/': { prerender: true }
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
      spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET
    }
  },

  ssr: true,
  compatibilityDate: '2024-12-04'
});
