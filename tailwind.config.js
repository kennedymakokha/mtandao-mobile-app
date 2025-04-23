/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#136207',
          50:  '#E6F7F3',
          100: '#CCEEE7',
          200: '#99DDD0',
          300: '#66CDB8',
          400: '#33BCA1',
          500: '#00AC89', // lighter than base
          600: '#009E7D',
          700: '#007A5E', // base
          800: '#005E49',
          900: '#004235',
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

