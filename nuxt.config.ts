// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/ionic', 
    "@nuxtjs/supabase", 
    "@ant-design-vue/nuxt",
    '@pinia/nuxt',
  ],
  ssr: false,
  css: [
    'ant-design-vue/dist/reset.css',
    '~/assets/css/global.scss',
    '~/assets/css/ionic.css'
  ],

  ionic: {
    integrations: {
      // pwa: false,
      router: true,
    },
  },

  vite: {
    resolve: {
      alias: {
        'ant-design-vue/dist': 'ant-design-vue/dist',
        'ant-design-vue/es': 'ant-design-vue/es',
        'ant-design-vue/lib': 'ant-design-vue/es',
        'ant-design-vue': 'ant-design-vue/es',
      },
    },
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  experimental:{
    payloadExtraction: false
  },

  compatibilityDate: '2024-07-05'
})