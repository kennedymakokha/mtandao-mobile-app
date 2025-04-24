/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#136207',
          
          50:  '#89b183',
          100: '71a16a',
          200: '#5a9151',
          300: '#428139',
          400: '#2b7220',
          500: '#136207', // base, 
          600: '#115806',
          700: '#0f4e05',
          800: '#0b3b04',
          900: '#0a3104',
        },
        secondary: {
          DEFAULT: '#FFD700',
          50: '#FFF9E5',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFD233',
          500: '#FFD700', // base
          600: '#E6C200',
          700: '#B39800',
          800: '#806E00',
          900: '#4D4400',
        },
      },
    },
  },
  plugins: [],
}

