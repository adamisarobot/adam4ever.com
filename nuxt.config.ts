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
        { rel: 'me', href: 'https://www.themoviedb.org/u/adam4ever' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Arvo:ital@0;1&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap' }
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
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/cloudinary',
    'nuxt-time',
    '@nuxt/content',
    'nitro-cloudflare-dev'
  ],
  
  nitro: {
    preset: "cloudflare_module",

    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },

  runtimeConfig: {
    public: {},
    private: {}
  },

  ssr: true,
  compatibilityDate: '2025-09-27'
});
