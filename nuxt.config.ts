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

  nitro: {
    preset: 'bun',
  },

  vite: {
    build: {
      target: 'ESNext',
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:list"; @use "~/assets/styles" as *;',
        },
      },
    },
  },

  css: ['modern-normalize'],

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
    '@nuxt/image',
    'nuxt-svgo',
    'nuxt-vitalizer',
  ],

  piniaPluginPersistedstate: {
    key: 'pinia_%id',
  },

  googleFonts: {
    families: {
      Inter: '100..900',
    },
  },

  image: {
    provider: 'ipx',
    domains: ['example.com'],
    ipx: {
      modifiers: {
        format: 'webp',
        quality: 80,
      },
    },
  },

  svgo: {
    componentPrefix: 'I',
  },

  vitalizer: {
    disablePrefetchLinks: true,
    disablePreloadLinks: true,
    disableStylesheets: true,
  },

  runtimeConfig: {
    public: {
      BASE_API_URL: process.env.BASE_API_URL,
      BASE_URL: process.env.BASE_URL,
    },
  },

  devServer: {
    port: 3000,
    https:
      process.env.HTTPS === 'true'
        ? {
            key: './certs/privkey.pem',
            cert: './certs/cert.pem',
          }
        : undefined,
  },

  compatibilityDate: '2025-01-24',
})
