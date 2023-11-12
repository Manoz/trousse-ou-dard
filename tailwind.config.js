/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js}', './index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#e2001a'
      },

      fontFamily: {
        sans: ['Nunito', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
