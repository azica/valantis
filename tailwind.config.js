/** @type {import('tailwindcss').Config} */
const colorsScheme = require("./src/assets/styles/color");

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  prefix: "",
  theme: {
    fontFamily: {
      'sans-serif': ["Poppins"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        mobile: '375px',
      },
    },
    extend: {
      colors: {...colorsScheme},
    },
  },
  plugins: [
    // require('flowbite/plugin'), 
  ],

}
