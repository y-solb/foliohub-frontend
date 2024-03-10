import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    animation: {
      fadeIn: 'fadeIn 0.2s ease-out',
      fadeOut: 'fadeOut 0.2s ease-out',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
      pulse: {
        '0%, 100%': {
          opacity: '1',
        },
        '50%': {
          opacity: '.5',
        },
      },
    },
    extend: {
      fontFamily: {
        'noto-sans-kr': ['var(--noto_sans_kr)'],
        'noto-sans': ['var(--noto_sans)'],
      },
    },
  },
  plugins: [],
}
export default config
