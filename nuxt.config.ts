// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@vercel/analytics'
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
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'zh', name: '中文', file: 'zh.json' },
      { code: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'ko', name: '한국어', file: 'ko.json' },
      { code: 'it', name: 'Italiano', file: 'it.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' },
    ],
    defaultLocale: 'es',
    langDir: '../i18n/locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  googleFonts: {
    families: {
      'Playfair Display': [400, 700],
      'Lora': [400, 500, 700],
      'Crimson Text': [400, 600, 700],
      'Noto Serif SC': [400, 700],
      'Noto Serif JP': [400, 700],
      'Noto Serif KR': [400, 700],
    },
    display: 'swap',
    preload: true,
  },

  app: {
    head: {
      title: 'Los Escritores Olvidados',
      htmlAttrs: {
        lang: 'es',
      },
      meta: [
        { name: 'description', content: 'Comunidad de escritores - Discord' },
      ],
    },
  },
})
