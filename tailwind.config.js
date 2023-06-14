/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
   
    extend: {
    colors: {
          'tea-rose':{
            500: '#F8C7CC'
          },
          'green':{
            300: '#97b299',
            400: '#81A684',
            800: '#466060'

          },
          'feldgrau': {
            400: '#466060'
          }
        },

    },
  },
  plugins: [
require('@tailwindcss/typography')

  ],
}

