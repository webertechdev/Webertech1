/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        weber: {
          green: '#16a34a',
          dark: '#0f172a',
        }
      }
    },
  },
  plugins: [],
}
