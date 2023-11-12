/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js}', './index.html'],
  theme: {
    extend: {
      colors: {
        base: '#284b63',
        mainBg: '#f8f8f8'
      },

      fontFamily: {
        sans: ['Nunito', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
