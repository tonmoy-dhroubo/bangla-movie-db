/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {},
    fontFamily: {
      'cursive': ['Sedgwick Ave Display', 'sans-serif'],
      'bangla' : ['Alkatra', 'sans-serif'],
    }
  },
  plugins: [

  ],
}
