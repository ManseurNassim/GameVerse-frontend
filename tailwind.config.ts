import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
    './services/**/*.{js,ts,jsx,tsx}',
    './*.tsx',
  ],
  theme: {
    extend: {
      animation: {
        'icon-switch': 'iconSwitch 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        iconSwitch: {
          '0%': {
            opacity: '1',
            transform: 'scale(1) rotateZ(0deg)',
          },
          '50%': {
            opacity: '0',
            transform: 'scale(0.7) rotateZ(90deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) rotateZ(0deg)',
          },
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
