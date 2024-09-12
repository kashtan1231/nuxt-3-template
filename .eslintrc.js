/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  plugins: ['prettier', 'eslint-plugin-vue'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
