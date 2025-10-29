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
          DEFAULT: '#D89A55',
          dark: '#5C4735',
          gradient: {
            start: '#5C4735',
            end: '#D89A55',
          }
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
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #5C4735 0%, #D89A55 100%)',
        'gradient-primary-hover': 'linear-gradient(90deg, #4a3829 0%, #c28945 100%)',
      }
    },
  },
  plugins: [],
}
