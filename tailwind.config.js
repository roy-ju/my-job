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
          DEFAULT: '#7048E8',
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
      spacing: {
        px: '1px',
        0: '0px',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
      },
      boxShadow: {
        DEFAULT:
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        none: 'none',
      },
    },
  },
  plugins: [],
};
