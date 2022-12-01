/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      width: {
        150: '170px',
        190: '190px',
        225: '225px',
        275: '275px',
        300: '300px',
        340: '340px',
        350: '350px',
        375: '375px',
        460: '460px',
        650: '650px',
        646: '646px',
        880: '880px',
        508: '508px',
      },
      height: {
        80: '48px',
        150: '148px',
        225: '225px',
        322: '322px',
        340: '340px',
        370: '370px',
        420: '420px',
        575: '575px',
        600: '600px',
        650: '650px',
        685: '685px',
        774: '774px',
        800: '800px',
        '90vh': '90vh',
      },
      colors: {
        firstcolor: '#E8DDF2',
        lineColor: '#8C54BF',
        cartNumBg: '#e80013',
        NumBg: '#FBFBFB',
        textColor: '#393939',
        primary: '#2F1C40',
        cardOverlay: '#2FB087',
        lighttextGray: '#B0B0B0',
        card: '#F9F3FF',
        cartBg: '#2F1C40',
        cartItem: '#2e3033',
        cartTotal: 'rgba(232, 221, 242, 0.2)',
        ourmission: '#279371',
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000',
        green: '#185844',
        btn: '#5d387f',
        header: '#393939',
        text: '#000',
        span: '#c5a9df',
        cards: '#5a5a5a',
        card_border: '#D2D2D2',
        input_border: '#e6e6e6',
        input: '#f9f9f9',
        blog: '#176b8b',
        dark: {
          primary: '#5A5A5A',
          100: '#F6F6F6',
          200: '#393939',
          300: '#e5e5e5',
        },
        purple: {
          primary: '#8C54BF',
          100: '#E8DDF2 ',

          500: '#5D387F',
        },
      },

      minWidth: {
        210: '210px',
        350: '350px',
        620: '620px',
      },
    },
  },
  plugins: [],
};
