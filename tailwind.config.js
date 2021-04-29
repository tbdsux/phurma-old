const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors
    },
    fontFamily: {
      sans: ['"Inter"', 'sans-serif']
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
