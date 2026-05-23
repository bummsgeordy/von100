/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        muted: '#64748b',
        line: '#d9e2ef',
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          600: '#0b63ce',
          700: '#084fa6',
        },
        teal: {
          600: '#0f766e',
        },
      },
      boxShadow: {
        soft: '0 8px 30px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};
