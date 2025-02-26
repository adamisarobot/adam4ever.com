// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import css from '@eslint/css';

export default withNuxt(
  // Your custom configs here
  {
    files: ['**/*.{js,vue,ts}'],
    rules: {
      // Several HTML elements don't have a closing tag.
      'vue/html-self-closing': 'off'
    }
  },
  {
    files: ['**/*.{css, vue}'],
    plugins: { css },
    language: 'css/css',
    rules: {
      'css/no-duplicate-imports': 'error'
    }
  }
);
