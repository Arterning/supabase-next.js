module.exports = {
  content: [
    './pages/*.{js,jsx,tsx}',
    './pages/**/*.{js,jsx,tsx}',
    './components/**/*.{js,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'bear-pattern': "url('/bear-8ff11f9d.png')",
        'grass-pattern': "url('/leaves1-79336cd2.png')",
        "mountain":"url('/mountain.webp')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
