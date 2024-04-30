/** @type {import('tailwindcss').Config} */
import { range } from 'lodash';

const pxToRem = (px, base = 16) => `${px / base}rem`;

const pxToRemFunc = (start, end) =>
  range(start, end).reduce((acc, px) => {
    acc[`${px}pxr`] = pxToRem(px);
    return acc;
  }, {});

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      desktop: '1080px',
    },
    extend: {
      spacing: {
        ...pxToRemFunc(0, 1000),
        'screen-nav': 'calc(100vh - 120px)',
      }, // px을 rem으로 변환
      inset: {
        ...pxToRemFunc(0, 1000),
      }, // px을 rem으로 변환
      fontSize: {
        xb06: '28px',
        xb05: '24px',
        xb04: '20px',
        xb03: '16px',
        xb02: '14px',
        xb01: '12px',
        b04: '20px',
        b03: '16px',
        b02: '14px',
        b01: '12px',
        sb03: '16px',
        sb02: '14px',
        sb01: '12px',
        m04: '16px',
        m03: '14px',
        m02: '12px',
        m01: '10px',
        r02: '16px',
        r01: '14px',
        ...pxToRemFunc(0, 1000),
      }, // px을 rem으로 변환
      fontWeight: {
        xb06: '800',
        xb05: '800',
        xb04: '800',
        xb03: '800',
        xb02: '800',
        xb01: '800',
        b04: '700',
        b03: '700',
        b02: '700',
        b01: '700',
        sb03: '600',
        sb02: '600',
        sb01: '600',
        m04: '500',
        m03: '500',
        m02: '500',
        m01: '500',
        r02: '400',
        r01: '400',
      },
      lineHeight: {
        ...pxToRemFunc(0, 1000),
      }, // px을 rem으로 변환
      colors: {
        primary: 'rgba(102, 98, 201, 1)',
        secondary: 'rgba(124, 120, 224, 1)',
        tertiary: 'rgba(210, 202, 250, 1)',
        negative: 'rgba(225, 25, 0, 1)',
        contentPrimary: 'rgba(32, 33, 35, 1)',
        contentSecondary: 'rgba(109, 112, 126, 1)',
        contentTertiary: 'rgba(157, 161, 180, 1)',
        gray100: 'rgba(241, 241, 241, 1)',
        gray200: 'rgba(210, 210, 210, 1)',
        gray300: 'rgba(172, 171, 173, 1)',
        gray400: 'rgba(136, 135, 137, 1)',
        gray500: 'rgba(82, 82, 82, 1)',
        gray600: 'rgba(52, 52, 52, 1)',
      },
      boxShadow: {
        navShadow: '0px -2px 4px 0px rgba(0,0,0,0.1)',
        meetUp: '0px 2px 20px 0px rgba(0,0,0,0.15)',
      },
      backgroundImage: {
        customBg: 'linear-gradient(180deg, #D0CEFF 0%, #FDFDFF 50%, #FFF 100%)',
      },
    },
  },
  plugins: [],
};
