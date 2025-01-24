import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/html-self-closing': 0,
    '@typescript-eslint/no-explicit-any': 'warn',
  },
})
