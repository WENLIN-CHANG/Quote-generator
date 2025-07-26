/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app.js",
    "./**/*.{js,html}"
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#fef7ed',
          100: '#fef3e2',
          200: '#fde68a',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03'
        }
      },
      fontFamily: {
        'chinese': ['PingFang TC', 'Microsoft JhengHei', 'Noto Sans TC', 'sans-serif']
      }
    },
  },
  plugins: [],
}