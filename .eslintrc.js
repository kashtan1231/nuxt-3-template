/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['eslint:recommended', '@nuxt/eslint-config'],
  plugins: ['prettier', 'eslint-plugin-vue'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
