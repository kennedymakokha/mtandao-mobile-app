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
          DEFAULT: '#ffaa1d',
          50: '#fff5e5',
          100: '#ffe5b8',
          200: '#ffd38a',
          300: '#ffc15c',
          400: '#ffae2e',
          500: '#ffaa1d',  // base
          600: '#e69519',
          700: '#cc8316',
          800: '#b37012',
          900: '#8c570d',
        },
      },
    },
  },
  plugins: [],
}

