export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f5f3ef',
          100: '#e8e4dc',
          200: '#d4cdc0',
          300: '#b8ae9c',
          400: '#9a8e7a',
          500: '#7d7060',
          600: '#635849',
          700: '#4a4135',
          800: '#322c24',
          900: '#1a1714',
          950: '#0d0b09',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
}
