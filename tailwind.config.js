const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '425px',
      ...defaultTheme.screens
    },
    fontFamily: {
      sans: ['"Inter"', 'sans-serif']
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require('@ootiq/tailwind-blandcolors'), require('@tailwindcss/line-clamp')]
};
