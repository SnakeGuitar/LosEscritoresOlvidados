// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  runtimeConfig: {
    databaseUrl: '',
    discordClientId: '',
    discordClientSecret: '',
    discordRedirectUri: '',
    discordGuildId: '',
    discordOwnerUserId: '',
    discordAdminRoleId: '',
    discordModRoleId: '',
    discordReaderRoleId: '',
    sessionSecret: '',
  },

  modules: [
    '@nuxtjs/i18n',
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
  app: {
    head: {
      title: 'Los Escritores Olvidados — Comunidad literaria',
      htmlAttrs: {
        lang: 'es',
      },
      meta: [
        { name: 'description', content: 'Comunidad literaria en Discord con lecturas semanales, acompañamiento editorial y concursos temáticos.' },
        { name: 'theme-color', content: '#23142e' },
      ],
    },
  },
})
