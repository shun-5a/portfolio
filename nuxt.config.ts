// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@200&display=swap',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap',
          crossorigin: '',
        },
      ],
    },
  },

  // css
  css: [
    'normalize.css',
    '@/assets/css/global.css',
  ],
  compatibilityDate: '2024-11-01',

  // eslint
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },
});
