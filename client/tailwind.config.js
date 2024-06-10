/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import form from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.sky['500'],
          ...colors.sky,
        },
        danger: {
          DEFAULT: colors.red['500'],
          ...colors.red,
        },
        warning: {
          DEFAULT: colors.yellow['500'],
          ...colors.yellow,
        },
        success: {
          DEFAULT: colors.green['500'],
          ...colors.green,
        },
        light: {
          DEFAULT: colors.slate['50'],
        },
        gray: {
          DEFAULT: colors.gray['400'],
        },
      },
    },
  },
  plugins: [form],
};
