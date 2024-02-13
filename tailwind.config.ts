import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    animation: {
      fadeIn: 'fadeIn 1s ease-out',
      fadeOut: 'fadeOut 1s ease-out',
    },
    keyframes: {
      fadeIn: {
        '0%': {
          opacity: '0',
        },
        '100%': {
          opacity: '1',
        },
      },
      fadeOut: {
        '0%': {
          opacity: '1',
        },
        '100%': {
          opacity: '0',
        },
      },
    },
    extend: {
      fontFamily: {
        'noto-sans-kr': ['var(--noto_sans_kr)'],
      },
    },
  },
  plugins: [],
}
export default config
