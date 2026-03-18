// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
  ],

  css: [
    '~/assets/css/light-theme.css',
    '~/assets/css/dark-theme.css',
    '~/assets/css/main.css',
  ],

  i18n: {
    locales: [
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'es',
    langDir: '../i18n/locales',
    strategy: 'prefix_except_default',
  },

  googleFonts: {
    families: {
      'Playfair Display': [400, 700],
      'Lora': [400, 500, 700],
      'Crimson Text': [400, 600, 700],
    },
    display: 'swap',
  },

  app: {
    head: {
      title: 'Los Escritores Olvidados',
      meta: [
        { name: 'description', content: 'Comunidad de escritores - Discord' },
      ],
    },
  },
})
