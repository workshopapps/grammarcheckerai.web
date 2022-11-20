/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        btn: "#5d387f",
        header: "#393939",
        text: "#000",
        span: "#c5a9df",
        cards: "#5a5a5a",
        card_border: "#d2d2d2",
        input_border: "#e6e6e6",
        input: "#f9f9f9",
        blog: "#176b8b",
      }
    },
  },
  plugins: [],
};
