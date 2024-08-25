const white = '#ffffff';
const black = '#000000';

const primary = '##DA592F';
const secondary = '#52D76E';

const success = '#0B9D37';
const warning = '#EBAC13';
const error = '#DF092E';

const bgColor = '#F5F5F5';

module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      'bg-color': {
        base: bgColor,
      },
      white: {
        DEFAULT: white,
      },
      black: {
        DEFAULT: black,
      },
      primary: {
        DEFAULT: primary,
        100: '#f9e3dc',
        200: '#f3c8ba',
        300: '#ecac97',
        400: '#e69074',
        500: '#e07552',
        600: '#c44a23',
        700: '#a73f1e',
        800: '#8a3419',
        900: '#6d2913',
        1000: '#501e0e',
      },
      secondary: {
        DEFAULT: secondary,
        100: '#e2f8e7',
        200: '#c5f2cf ',
        300: '#a9ebb7',
        400: '#8ce49e',
        500: '#6fde86',
        600: '#32d054',
        700: '#29b246',
        800: '#22933a',
        900: '#1b732d',
        1000: '#135421',
      },

      success: {
        base: error,
      },

      warning: {
        base: error,
      },

      error: {
        base: error,
      },
    },

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
};
