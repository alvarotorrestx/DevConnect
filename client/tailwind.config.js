/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fade: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        nord: {
          ...require("daisyui/src/theming/themes")["nord"],
          info: "#28ebff",
          success: "#3f5069",
          error: "#ff637d",
          "--tertiary": "#3f5069",
        },
      },
      {
        dim: {
          ...require("daisyui/src/theming/themes")["dim"],
          primary: "#5e81ac",
          "primary-content": "#03060b",
          secondary: "#81a1c1",
          "secondary-content": "#060e10",
          accent: "#88c0d0",
          neutral: "#4c566a",
          "--rounded-btn": "0.25rem",
          error: "#ff637d",
          "--tertiary": "#3f5069",
        },
      },
    ]
  }
}