/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ac-black': '#080808',
        'ac-white': '#F0EDE8',
        'ac-red': '#FF2200',
        'ac-grey': '#1A1A1A',
        'ac-mid': '#333333',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
