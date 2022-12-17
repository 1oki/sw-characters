/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        '12': '3rem',
      },
      colors: {
        yellowMain: '#FFE300'
      },
      screens:{
        xs: '335px',
        sm: '480px',
        md: '780px',
        lg: '1028px'
      }
    },
  },
  plugins: [],
}
