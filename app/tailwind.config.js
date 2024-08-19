/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{js,jsx,ts,tsx}', './src/pages/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        overlay: {
          from: { right: '-640px' },
          to: { right: '0px' },
        },
      },

      animation: {
        overlay: 'overlay 300ms',
      },
    },
  },
  plugins: [],
};
