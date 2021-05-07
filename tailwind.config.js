module.exports = {
  purge: [
    './pages/**/*.{ts,tsx}',
    './ui/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      serif:
        '"Cormorant Garamond", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
