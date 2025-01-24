// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Template nuxt 3',
      meta: [
        {
          name: 'description',
          content: 'Nuxt 3 template app for development',
        },
      ],
    },
  },

  vite: {
    build: {
      target: 'ESNext',
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use 'sass:list'; @import '~/styles/scss/imports.scss';`,
          api: 'modern-compiler',
          silenceDeprecations: ['import'],
        },
      },
    },
  },

  css: ['normalize.css/normalize.css'],

  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    [
      'dayjs-nuxt',
      {
        plugins: ['duration', 'relativeTime'],
      },
    ],
  ],

  piniaPluginPersistedstate: {
    key: 'pinia_%id',
  },

  googleFonts: {
    families: {
      Inter: '100..900',
    },
  },

  devServer: {
    port: 3000,
    https: {
      key: './certs/privkey.pem',
      cert: './certs/cert.pem',
    },
  },

  compatibilityDate: '2025-01-24',
})