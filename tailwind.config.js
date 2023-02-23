const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        h1: [
          '1.5rem',
          {
            lineHeight: '1.5rem',
            lineHeight: '2.125rem',
            letterSpacing: '-0.025em',
          },
        ],
        h2: [
          '1.25rem',
          {
            lineHeight: '1.25rem',
            lineHeight: '1.75rem',
            letterSpacing: '-0.025em',
          },
        ],
        h3: [
          '1.125rem',
          {
            lineHeight: '1.125rem',
            lineHeight: '1.625rem',
            letterSpacing: '-0.025em',
          },
        ],
        b1: [
          '1rem',
          {
            lineHeight: '1rem',
            lineHeight: '1.5rem',
            letterSpacing: '-0.025em',
          },
        ],
        b2: [
          '0.875rem',
          {
            lineHeight: '0.875rem',
            lineHeight: '1.375rem',
            letterSpacing: '-0.025em',
          },
        ],
        info: [
          '0.75rem',
          {
            lineHeight: '0.75rem',
            lineHeight: '0.8rem',
            letterSpacing: '-0.025em',
          },
        ],
      },
      colors: {
        gray: {
          100: '#F8F9FA',
          200: '#F1F3F5',
          300: '#E9ECEF',
          400: '#DEE2E6',
          500: '#CED4DA',
          600: '#ADB5BD',
          700: '#868E96',
          800: '#495057',
          900: '#343A40',
          1000: '#212529',
        },
        nego: {
          100: '#F3F0FF',
          200: '#E5DBFF',
          300: '#D0BFFF',
          400: '#B197FC',
          500: '#9775FA',
          600: '#845EF7',
          700: '#7950F2',
          800: '#7048E8',
          900: '#6741D9',
          1000: '#5F3DC4',
        },
      },
    },
  },
  plugins: [],
};
