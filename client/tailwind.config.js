/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          dark: '#E85924',
          light: '#FF885E',
          50: '#FFF5F0',
          100: '#FFE8DF',
        },
        secondary: {
          DEFAULT: '#171717',
          light: '#262626',
          muted: '#737373',
        },
        accent: {
          DEFAULT: '#FFC857',
          dark: '#E5B142',
        },
        background: {
          DEFAULT: '#FFFDF8',
          dark: '#0F0F0F',
          card: '#FFFFFF',
          cardDark: '#1A1A1A',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(0, 0, 0, 0.06)',
        'premium': '0 20px 40px -15px rgba(255, 107, 53, 0.15)',
        'float': '0 15px 35px -5px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}

