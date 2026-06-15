export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
  },

  modules: ['@nuxtjs/i18n'],

  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/main.css',
  ],

  i18n: {
    locales: [
      { code: 'hy', language: 'hy-AM', file: 'hy.json', name: 'Հայ' },
      { code: 'ru', language: 'ru-RU', file: 'ru.json', name: 'Рус' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'Eng' },
    ],
    defaultLocale: 'hy',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    lazy: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'hy' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#fbfbf8' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cormorant+SC:wght@300;400&family=Inter:wght@300;400&display=swap',
        },
      ],
    },
  },
})
