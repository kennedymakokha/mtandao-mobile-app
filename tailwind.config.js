/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#136207',
         
          100: '#E7EFE6',
          200: '#D0E0CD',
          300: '#B8D0B5',
          400: '#A1C09C',
          500: '#89B183',
          600: '#71A16A',
          700: '#5A9151',
          800: '#428139',
          900: '#2B7220',
          950: '#136207',
        },
        secondary: {
          DEFAULT: '#c0a265',
          100: '#f0e7d9',
          200: '#e0ceb3',
          300: '#d1b58d',
          400: '#c29c68',
          500: '#c0a265', // base
          600: '#a38350',
          700: '#86653e',
          800: '#68492e',
          900: '#4b301f',
          950: '#2f1b11',
        },
      },
    },
  },
  plugins: [],
}

