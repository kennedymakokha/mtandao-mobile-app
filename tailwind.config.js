/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F2EF',
          100: '#CCE4DF',
          200: '#B3D7CF',
          300: '#99CABF',
          400: '#80BDAF',
          500: '#66AF9E',
          600: '#4DA28E',
          700: '#33957E',
          800: '#1A876E',
          900: '#007A5E',
          DEFAULT: '#007A5E',
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

