/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',    // Green ya Safaricom
        secondary: '#059669',  // Dark green
        dark: '#0F172A',
        light: '#F8FAFC',
        webertech: {
          blue: '#1e40af',     // Ikiwa unaitumia mahali pengine
          green: '#10b981',
        }
      }
    },
  },
  plugins: [],
}