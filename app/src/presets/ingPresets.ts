const white = '#ffffff';
const black = '#000000';

const primary = '##DA592F';
const secondary = '#52D76E';

const success = '#0B9D37';
const warning = '#EBAC13';
const error = '#DF092E';

const bgColor = '#F5F5F5';

export const colors = {
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

  grey: {
    100: '#f6f6f6',
    200: '#f2f2f2',
    300: '#e6e6e6',
    400: '#d2d2d2',
    500: '#b3b3b3',
    600: '#b2b2b2',
    700: '#999999',
    800: '#737373',
    900: '#515151',
    1000: '#333333',
  },

  red: {
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  yellow: {
    800: '#f5af00',
    700: '#e9ae21',
    600: '#ffc107',
    400: '#ffca28',
    200: '#ffd54f',
    100: '#fff3cd',
  },

  success: {
    base: success,
  },

  warning: {
    base: warning,
  },

  error: {
    base: error,
  },
};

const preset = {
  theme: {
    colors,

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

export default preset;
