const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  future: { hoverOnlyWhenSupported: true },

  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        h1: [
          '1.5rem',
          {
            lineHeight: '2.125rem',
            letterSpacing: '-0.25px',
          },
        ],
        h2: [
          '1.25rem',
          {
            lineHeight: '1.75rem',
            letterSpacing: '-0.25px',
          },
        ],
        h3: [
          '1.125rem',
          {
            lineHeight: '1.625rem',
            letterSpacing: '-0.25px',
          },
        ],
        b1: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '-0.25px',
          },
        ],
        b2: [
          '0.875rem',
          {
            lineHeight: '1.375rem',
            letterSpacing: '-0.25px',
          },
        ],
        info: [
          '0.75rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '-0.25px',
          },
        ],
        count: [
          '0.5rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0 !important',
          },
        ],
        mobCaption: [
          '0.75rem',
          {
            lineHeight: '0.875rem',
            letterSpacing: '0 !important',
          },
        ],

        /** 새로운 타이포그래피 타이틀 */

        display_01: ['1.625rem', { lineHeight: '2.25rem', letterSpacing: '-0.25px', fontWeight: 700 }],

        display_02: ['1.75rem', { lineHeight: '2.375rem', letterSpacing: '-0.25px', fontWeight: 700 }],

        display_03: [
          '1.875rem',
          {
            lineHeight: '2.625rem',
            letterSpacing: '-0.25px',
            fontWeight: 700,
          },
        ],

        heading_01: [
          '1.125rem',
          {
            lineHeight: '1.625rem',
            letterSpacing: '-0.25px',
            fontWeight: 700,
          },
        ],

        heading_02: [
          '1.25rem',
          {
            lineHeight: '1.75rem',
            letterSpacing: '-0.25px',
            fontWeight: 700,
          },
        ],

        heading_03: [
          '1.375rem',
          {
            lineHeight: '1.875rem',
            letterSpacing: '-0.25px',
            fontWeight: 700,
          },
        ],

        heading_04: [
          '1.5rem',
          {
            lineHeight: '2.125rem',
            letterSpacing: '-0.25px',
            fontWeight: 700,
          },
        ],

        subhead_01: [
          '0.75rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '-0.25px',
            fontWeight: 700,
          },
        ],

        subhead_02: [
          '0.875rem',
          {
            lineHeight: '1.375rem',
            letterSpacing: '-0.25px',
            fontWeight: 700,
          },
        ],

        subhead_03: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '-0.25px',
            fontWeight: 700,
          },
        ],

        /** 새로운 타이포그래피 바디 */

        body_01: [
          '0.75rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '-0.25px',
            fontWeight: 400,
          },
        ],

        body_02: [
          '0.875rem',
          {
            lineHeight: '1.375rem',
            letterSpacing: '-0.25px',
            fontWeight: 400,
          },
        ],

        body_03: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '-0.25px',
            fontWeight: 400,
          },
        ],

        body_04: [
          '1.125rem',
          {
            lineHeight: '1.625rem',
            letterSpacing: '-0.25px',
            fontWeight: 400,
          },
        ],

        body_05: [
          '1.25rem',
          {
            lineHeight: '1.75rem',
            letterSpacing: '-0.25px',
            fontWeight: 400,
          },
        ],

        body_06: [
          '1.375rem',
          {
            lineHeight: '1.875rem',
            letterSpacing: '-0.25px',
            fontWeight: 400,
          },
        ],

        body_07: [
          '1.5rem',
          {
            lineHeight: '2.125rem',
            letterSpacing: '-0.25px',
            fontWeight: 400,
          },
        ],

        caption_01: [
          '0.625rem',
          {
            lineHeight: '1rem',
            letterSpacing: '-0.25px',
            fontWeight: 400,
          },
        ],
      },

      lineHeight: {
        3.5: '0.875rem',
        4.5: '1.125rem',
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
          50: '#F3F0FF50',
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
          1100: '#5F52F6',
          1200: '#9368EF',
          1300: '#EDEAFF',
        },
        blue: {
          DEFAULT: '#4C6EF5',
          100: '#EDF2FF',
          200: '#DBE4FF',
          300: '#BAC8FF',
          400: '#91A7FF',
          500: '#748FFC',
          600: '#5C7CFA',
          700: '#4C6EF5',
          800: '#4263EB',
          900: '#3B5BDB',
          1000: '#364FC7',
        },
        red: {
          DEFAULT: '#F83D3D',
          50: '#FFE2E4',
          100: '#FFE2E4',
          200: '#FFC7CA',
          300: '#FFA9AE',
          400: '#FF7B83',
          500: '#FF6666',
          600: '#FF5252',
          700: '#F83D3D',
          800: '#EA2323',
          900: '#CE1515',
          1000: '#B51313',
          1100: '#CA2F0B',
        },
        yellow: {
          DEFAULT: '#FFF5D9',
          kakao: '#FEE500',
          kakaoHover: '#FADA0A',
          100: '#FFF5D9',
          200: '#FFEEC0',
          300: '#FFE59F',
          400: '#FFDF86',
          500: '#FFD970',
          600: '#FFD257',
          700: '#FFCD4E',
          800: '#FBC436',
          900: '#F3BB29',
          1000: '#E9AC11',
        },
        green: {
          DEFAULT: '#E3FCED',
          100: '#E3FCED',
          200: '#D0F8E0',
          300: '#B4F1CC',
          400: '#90EAB4',
          500: '#62DC93',
          600: '#37D476',
          700: '#20C764',
          800: '#14BC58',
          900: '#10AF50',
          1000: '#009F40',
          1100: '#37D576',
        },
        orange: {
          DEFAULT: '#FFE9E0',
          100: '#FFE9E0',
          200: '#FFD4C1',
          300: '#FFB798',
          400: '#FF9C72',
          500: '#FF7E47',
          600: '#FF6737',
          700: '#FF542D',
          800: '#FF4216',
          900: '#DF330B',
          1000: '#CA2F0B',
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
      width: {
        21: '5.25rem',
      },
      maxWidth: {
        mobile: '26.75rem',
        mobileSmall: '23.4375rem',
      },
      height: {
        4.5: '1.125rem',
        11.5: '2.875rem',
        13.5: '3.375rem',
        37.5: '9.375rem',
      },
      boxShadow: {
        DEFAULT: '0px 8px 16px rgba(0, 0, 0, 0.14)',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        none: 'none',
        persistentBottomBar: '0px 0px 24px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        '4xl': '2.25rem',
        bubble: '3.25rem',
        100: '10rem',
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        panelSlideIn: {
          '0%': {
            opacity: 0,
            transform: 'translate(-100px, 0px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(0px, 0px)',
          },
        },
      },
      animation: {
        scale: 'scale 0.3s normal ease-in-out',
        panelSlideIn: 'panelSlideIn 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
      },
      backdropBlur: {
        20: '20px',
      },
      screens: {
        mobile: { min: '374px', max: '375px' },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
