/** @type { import("prettier").Config & import("prettier-plugin-astro").Plugin } */

export default {
  singleQuote: true,
  semi: false,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
