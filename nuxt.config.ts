// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  ssr: true,
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/google-fonts'],

  routeRules: {
    '/': { prerender: true },
  },

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

  compatibilityDate: '2024-12-04',
});
