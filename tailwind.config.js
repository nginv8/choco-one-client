/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,

      primary: colors.rose,
      secondary: colors.stone,
      accent: colors.yellow,
    },
    extend: {
      backgroundImage: {
        check: "url('/src/assets/svg/check.svg')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
