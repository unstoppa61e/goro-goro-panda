const plugin = require('tailwindcss/plugin');
const withAnimations = require('animated-tailwindcss');

const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-0': {
      transform: 'rotateY(0deg)',
    },
    '.rotate-y-90': {
      transform: 'rotateY(90deg)',
    },
  });
});

module.exports = withAnimations({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        theme: "url('/main-body-background.png')",
      },
      blur: {
        xs: '2px',
      },
      borderRadius: {
        '50%': '50%',
      },
      borderWidth: {
        6: '6px',
        10: '10px',
        14: '14px',
        28: '28px',
      },
      colors: {
        'stage-1': '#ff88bb',
        'stage-2': '#ff3978',
        'stage-3': '#ffaa00',
        'stage-4': '#ffcc33',
        'stage-5': '#99ee43',
        'stage-6': '#82eedd',
        'stage-7': '#84e0ff',
        'stage-8': '#0cbbff',
        'stage-9': '#1e88ff',
        'stage-10': '#de99ff',
        'stage-1-dark': '#b7004f',
        'stage-2-dark': '#b7003d',
        'stage-3-dark': '#b27700',
        'stage-4-dark': '#b28500',
        'stage-5-dark': '#66b510',
        'stage-6-dark': '#16a68e',
        'stage-7-dark': '#0089b7',
        'stage-8-dark': '#008abc',
        'stage-9-dark': '#0056b2',
        'stage-10-dark': '#7700b2',
        description: '#43bbe8',
        focused: '#fff000',
        mistaken: '#ffb5f0',
        ok: '#46d2aa',
        ng: '#ff3978',
        'navy-darkest': '#47b4c6',
        'navy-darker': '#43c3d4',
        'navy-lighter': '#25cfdf',
        'navy-lightest': '#2fdeee',
        'ok-dark': '#04bc88',
        'ok-light': '#59e7bf',
        'panel-white': '#ddf1ff',
      },
      fontFamily: {
        'kosugi-maru': ['Kosugi Maru'],
        'varela-round': ['Varela Round'],
      },
      opacity: {
        15: '.15',
      },
      width: {
        6.5: '26px',
        38: '152px',
        42: '168px',
        58: '232px',
      },
      height: {
        5.5: '22px',
      },
    },
  },
  plugins: [
    rotateY,
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.no-tap-highlighting': {
          '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
        },
      });
    }),
  ],
});
