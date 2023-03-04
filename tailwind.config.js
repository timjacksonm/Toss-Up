/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
