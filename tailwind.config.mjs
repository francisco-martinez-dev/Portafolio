/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0E1420', soft: '#161D2C' },
        paper: { DEFAULT: '#F6F5F1', soft: '#EFEDE7' },
        accent: { DEFAULT: '#E7A93F', soft: '#F3C878' },
        steel: { DEFAULT: '#6B7280', light: '#9AA1AC' },
        line: { light: '#D8D6D0', dark: '#232B3A' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};