/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sokko: {
          dark:        '#1A0E05',
          gold:        '#C8922A',
          'gold-light':'#D4A843',
          'gold-soft': '#C4A882',
          sand:        '#8A6940',
          warm:        '#F5EDD8',
        },
      },
      fontFamily: {
        cinzel:    ['var(--font-cinzel)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        raleway:   ['var(--font-raleway)', 'sans-serif'],
      },
      backgroundImage: {
        'gold-radial': 'radial-gradient(ellipse at center, #C8922A 0%, #1A0E05 70%)',
      },
    },
  },
  plugins: [],
};
