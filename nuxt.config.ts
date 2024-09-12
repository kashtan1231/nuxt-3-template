// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  vite: {
    build: {
      target: 'ESNext',
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/design/media.scss'; @import '@/design/colors.scss'; @import '@/design/typography.scss'; @import '@/design/default.scss';`,
        },
      },
    },
  },

  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@nuxt/eslint',
  ],

  compatibilityDate: '2024-09-12',

  devServer: {
    port: 4001,
    https: {
      key: './certs/privkey.pem',
      cert: './certs/cert.pem',
    },
  },
})
