import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2023-11-28',

  modules: ['@nuxtjs/tailwindcss', '@vite-pwa/nuxt', '@pinia/nuxt'],

  css: ['~/assets/main.css'],

  runtimeConfig: {
    public: {
      trousseBinId: process.env.NUXT_PUBLIC_TROUSSE_BIN_ID || '',
      jokeBinId: process.env.NUXT_PUBLIC_JOKE_BIN_ID || '',
      preferBinId: process.env.NUXT_PUBLIC_PREFER_BIN_ID || '',
      tenBinId: process.env.NUXT_PUBLIC_TEN_BIN_ID || '',
      howMuchBinId: process.env.NUXT_PUBLIC_HOWMUCH_BIN_ID || '',
      jsonbinApiKey: process.env.NUXT_PUBLIC_JSONBIN_API_KEY || ''
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Trousse ou Dard',
      short_name: 'Trousse',
      description: 'Trousse ou Dard',
      theme_color: '#e2001a',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      cleanupOutdatedCaches: true,
      globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}']
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'fr'
      },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600&display=swap'
        }
      ]
    }
  },

  devtools: { enabled: true }
})
