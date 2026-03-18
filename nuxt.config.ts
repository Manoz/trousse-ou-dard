import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-15',

  modules: ['@nuxtjs/tailwindcss', '@vite-pwa/nuxt', '@pinia/nuxt'],

  css: ['~/assets/main.css'],

  runtimeConfig: {
    jsonbinApiKey: process.env.NUXT_JSONBIN_API_KEY || '',
    trousseBinId: process.env.NUXT_TROUSSE_BIN_ID || '',
    jokeBinId: process.env.NUXT_JOKE_BIN_ID || '',
    preferBinId: process.env.NUXT_PREFER_BIN_ID || '',
    tenBinId: process.env.NUXT_TEN_BIN_ID || '',
    howMuchBinId: process.env.NUXT_HOWMUCH_BIN_ID || ''
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
      globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
      navigateFallback: undefined,
      runtimeCaching: [
        {
          urlPattern: /\/api\/games\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'jsonbin-api-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 // 24 hours
            },
            cacheableResponse: {
              statuses: [200]
            }
          }
        }
      ]
    }
  },

  app: {
    head: {
      title: 'Trousse ou Dard',
      meta: [
        {
          name: 'description',
          content: 'A little app with silly games just for parties with my buddies'
        },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
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

  vite: {
    optimizeDeps: {
      include: ['@headlessui/vue', '@heroicons/vue/24/outline']
    }
  },

  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
      }
    }
  },

  devtools: { enabled: true }
})
