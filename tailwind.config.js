/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js}', './index.html'],
  theme: {
    extend: {
      colors: {
        primaryTrousse: '#0fa3b1',
        primaryJokes: '#b5e2fa',
        base: '#284b63',
        mainBg: '#f9f7f3'
      },

      fontFamily: {
        sans: ['Nunito', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
