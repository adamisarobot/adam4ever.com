// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import css from '@eslint/css';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default withNuxt(
  // Your custom configs here
  {
    files: ['**/*.{js,vue,ts}'],
    rules: {
      // Several HTML elements don't have a closing tag.
      'vue/html-self-closing': 'off',
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    rules: {
      'css/no-duplicate-imports': 'error',
      'no-irregular-whitespace': 'off'
    }
  },
  eslintPluginPrettierRecommended
);
