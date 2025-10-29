/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        dark: {
          bg: '#0f111a',
          card: '#1a1d29',
          lighter: '#252836',
        },
        green: {
          profit: '#10b981',
        },
        red: {
          loss: '#ef4444',
        }
      },
    },
  },
  plugins: [],
}
