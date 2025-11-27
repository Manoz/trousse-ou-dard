/* eslint-env node */
import noviusConfigVue from '@novius/eslint-config-vue'
import globals from 'globals'

export default [
  ...noviusConfigVue,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  }
]
