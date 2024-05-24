import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['var(--font-anton)'],
        swansea: ['var(--font-swansea)', 'sans-serif'],
        'playfair-display': ['var(--font-playfair-display)'],
      },
      colors: {
        'brand-primary': {
          '300': '#FFFFFF',
          '500': '#FFFFFF',
          '900': '#CCCCCC',
        },
        'brand-secondary': {
          '300': '#333333',
          '500': '#000000',
          '900': '#000000',
        },
        'brand-accent': {
          '300': '#13EE6C',
          '500': '#0DB551',
          '900': '#0A9141',
        },
        'system-success': '#10B981',
        'system-error': '#F43F5E',
        'system-warning': '#F59E0B',
        'social-facebook': '#0866FF',
      },
    },
  },
  plugins: [],
}
export default config
