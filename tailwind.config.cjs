const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        lockd: {
          primary: '#a78bfa',
          'primary-content': '#0c021f',
          secondary: '#2dd4bf',
          accent: '#f472b6',
          neutral: '#1a1e2c',
          'base-100': '#05070f',
          'base-200': '#090e1c',
          'base-300': '#141b2f',
          info: '#38bdf8',
          success: '#22c55e',
          warning: '#fcd34d',
          error: '#fb7185',
        },
      },
      'dark',
    ],
  },
};
