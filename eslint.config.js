import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/.nuxt/**',
      '**/.output/**'
    ]
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  eslintConfigPrettier,
  {
    name: 'app/globals',
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Nuxt auto-imports
        useRuntimeConfig: 'readonly',
        defineNuxtConfig: 'readonly',
        navigateTo: 'readonly',
        useState: 'readonly',
        useFetch: 'readonly',
        useAsyncData: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly'
      }
    }
  },
  {
    name: 'app/rules',
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  }
]
