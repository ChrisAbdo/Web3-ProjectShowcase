/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['lofi, black'],
  },
  plugins: [require('daisyui'), require('flowbite/plugin')],
};
