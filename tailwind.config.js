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
        'stage-2': '#bbeeff',
        'stage-3': '#82eedd',
        'stage-4': '#de99ff',
        'stage-5': '#0cbbff',
        'stage-6': '#ffcc33',
        'stage-7': '#ff3978',
        'stage-8': '#ffaa00',
        'stage-9': '#99ee43',
        'stage-10': '#1e88ff',
        description: '#43bbe8',
        focused: '#fff000',
        locked: '#b7d6e8',
        mistaken: '#ffb5f0',
        ribbon: '#135acb',
        ok: '#46d2aa',
        ng: '#ff3978',
        'navy-darkest': '#47b4c6',
        'navy-darker': '#43c3d4',
        'navy-lighter': '#25cfdf',
        'navy-lightest': '#2fdeee',
        'ok-dark': '#04bc88',
        'ok-light': '#59e7bf',
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
