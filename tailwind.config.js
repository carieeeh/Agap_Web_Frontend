/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.js",
    "./src/**/*.vue",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./vueform.config.js", // or where `vueform.config.js` is located. Change `.js` to `.ts` if required.
    "./node_modules/@vueform/vueform/themes/tailwind/**/*.vue",
    "./node_modules/@vueform/vueform/themes/tailwind/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['"Outfit"', "sans-serif"],
      },
      colors: {
        primaryRed: "#FF1F1E",
        primaryYellow: "#FFC700",
      },
    },
  },
  plugins: [
    require('@vueform/vueform/tailwind'),
  ],
};

// Red - FF1F1E
// Light Gray - ECEAEA
// Dark Gray - D9D9D9
// White -
// Yellow - FFC700
// Green - 04AA32
// Blue - 3E1EFF
// Sky Blue - 17C1CC
