/** @type {import('tailwindcss').Config} */

const vyagutaPresets = require('./presets/ingPresets.ts');

module.exports = {
  presets: [vyagutaPresets],
  content: ['./src/components/**/*.{js,jsx,ts,tsx}', './src/pages/**/*.{js,jsx,ts,tsx}'],
  plugins: [],
};
