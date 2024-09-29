/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    styled: true,
    themes: ['nord'],
  }
}