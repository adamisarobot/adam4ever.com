// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  // Your custom configs here
  {
    files: ['src/**/*.{js,vue,ts}'],
    rules: {
      // Several HTML elements don't have a closing tag.
      'vue/html-self-closing': 'off'
    }
  }
);
