/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          l: "#f3f3ff",
          m: "#0a0aff",
          d: "#000029",
        },
        secondary: {
          l: "#D7E7FE",
          m: "#3F8EFC",
          d: "#033477",
        },
        accent: {
          l: "#f9c8d4",
          m: "#ed254e",
          d: "#370612",
        },
      },
    },
  },
  plugins: [],
};
