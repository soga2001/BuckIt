// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primevue/themes/aura';

// import 'primeicons/primeicons.css'



export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/ionic', "@nuxtjs/supabase", // "@ant-design-vue/nuxt",
  '@pinia/nuxt', '@primevue/nuxt-module', "@nuxtjs/tailwindcss"],
  ssr: false,
  css: [
    'ant-design-vue/dist/reset.css',
    '~/assets/styles/global.scss',
    '~/assets/styles/ionic.css'
  ],

  ionic: {
    integrations: {
      // pwa: false,
      router: true,
    },
  },

  vite: {
    // resolve: {
    //   alias: {
    //     'ant-design-vue/dist': 'ant-design-vue/dist',
    //     'ant-design-vue/es': 'ant-design-vue/es',
    //     'ant-design-vue/lib': 'ant-design-vue/es',
    //     'ant-design-vue': 'ant-design-vue/es',
    //   },
    // },
    css: {
      preprocessorOptions: {
          sass: {
              // additionalData: '@import "@/assets/style/global.scss"',

          },
      },
    },
  },
  primevue: {
    options: {
        theme: {
            preset: Aura
        }
    }
  },

  supabase: {
    // Options
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/register', '/testing'],
      cookieRedirect: false,
    },
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 10,
      sameSite: 'lax',
      secure: true
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      },
    }    
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  experimental:{
    payloadExtraction: false
  },

  compatibilityDate: '2024-07-05'
})