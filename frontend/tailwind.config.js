/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'system-ui', 'sans-serif'],
        roboto: ['Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: 'hsl(136, 53%, 59%)',
        accent: 'hsl(136, 53%, 45%)',
        text: 'hsl(216, 8%, 12%)',
        gray: 'hsla(231, 6%, 58%, 1)',
      },
    },
  },
  plugins: [],
};
