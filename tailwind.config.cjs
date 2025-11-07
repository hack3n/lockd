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
      backgroundImage: {
        'lockd-grid':
          'linear-gradient(transparent 0, transparent 94%, rgba(255,255,255,0.04) 95%), linear-gradient(90deg, transparent 0, transparent 94%, rgba(255,255,255,0.04) 95%)',
        'lockd-radial':
          'radial-gradient(circle at 20% 20%, rgba(129,140,248,0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(16,185,129,0.25), transparent 40%), radial-gradient(circle at 30% 80%, rgba(14,165,233,0.25), transparent 45%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      boxShadow: {
        glow: '0 25px 65px rgba(94, 96, 255, 0.35)',
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
