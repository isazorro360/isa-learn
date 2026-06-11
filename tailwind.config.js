export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 60px rgba(34, 105, 255, 0.18)',
      },
      colors: {
        brand: {
          light: '#E8F1FF',
          DEFAULT: '#1B4DB9',
          dark: '#0F2C6D',
        },
      },
      backgroundImage: {
        'hero-pattern': 'radial-gradient(circle at top, rgba(59, 130, 246, 0.12), transparent 40%)',
      },
    },
  },
  plugins: [],
};
