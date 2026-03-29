/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cozy: {
          50: '#f9f6f0', // Very light, off-white beige
          100: '#f0eadd', // Light beige
          200: '#dfd2bc', // Soft warm sand
          300: '#cbb396', // Warm wood/earth
          400: '#b49070',
          500: '#a37754',
          600: '#976246', // Deep terracotta/wood
          700: '#7e4e3b',
          800: '#684133',
          900: '#54362b', // Very dark warm brown
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
}
