/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000',
        green: '#185844',
        btn: "#5d387f",
        header: "#393939",
        text: "#000",
        span: "#c5a9df",
        cards: "#5a5a5a",
        card_border: "#d2d2d2",
        input_border: "#e6e6e6",
        input: "#f9f9f9",
        blog: "#176b8b",
        dark: {
          primary: '#5A5A5A',
          100: '#F6F6F6',
          200: '#393939',
        },
        purple: {
          primary: '#8C54BF',
          100: '#E8DDF2 ',

          500: '#5D387F',
        },
      },
      screens: {
        sm: { min: '320px', max: '480px' },
        md: { min: '481px', max: '768px' },
        lg: { min: '769px' },
      },

    },
  },
  plugins: [],
};
