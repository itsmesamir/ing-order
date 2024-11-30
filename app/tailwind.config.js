/** @type {import('tailwindcss').Config} */

const ingPresets = require('./src/presets/ingPresets.ts');

module.exports = {
  presets: [ingPresets],
  content: ['./src/components/**/*.{js,jsx,ts,tsx}', './src/pages/**/*.{js,jsx,ts,tsx}'],
  plugins: [],
};
