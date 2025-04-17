/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#136207',
          50: '#e3f5dc',
          100: '#c1eab4',
          200: '#9edc8a',
          300: '#7bcd5f',
          400: '#59be34',
          500: '#3fa41a',  // lighter than default
          600: '#2e810f',
          700: '#216108',
          800: '#144004',
          900: '#081e01',
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

