// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: `https://adam4ever.com/` },
        {
          rel: 'me',
          href: 'https://bsky.app/profile/adam4ever.com'
        },
        { rel: 'me', href: 'https://mastodon.social/@adam4ever' },
        {
          rel: 'me',
          href: 'https://pxlfd.ca/i/web/profile/787314293798586242'
        },
        { rel: 'me', href: 'https://github.com/adamisarobot' },
        { rel: 'me', href: 'https://hardcover.app/@adam4ever' },
        { rel: 'me', href: 'https://www.themoviedb.org/u/adam4ever' }
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

  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },

  modules: [
    '@nuxthub/core',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    // '@nuxtjs/robots',
    '@nuxtjs/cloudinary',
    '@nuxt/fonts',
    'nuxt-time',
    '@nuxt/content'
  ],

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: false,
      nodeCompat: true
    }
  },

  // robots: {
  //   blockAiBots: true
  // },

  // routeRules: {
  //   '/': { prerender: true }
  // },

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
  compatibilityDate: '2024-01-01'
});
