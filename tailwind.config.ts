import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['var(--font-anton)'],
        swansea: ['var(--font-swansea)', 'sans-serif'],
        'playfair-display': ['var(--font-playfair-display)'],
      },
      colors: {
        'brand-primary': '#FFFFFF',
        'brand-secondary': '#000000',
        'brand-accent': '#0DB551',
        'system-success': '#10B981',
        'system-error': '#F43F5E',
        'system-warning': '#F59E0B',
      },
    },
  },
  plugins: [],
};
export default config;
