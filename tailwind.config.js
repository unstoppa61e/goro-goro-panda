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
        theme: '#3bcaff',
        ok: '#46d2aa',
        ng: '#ff3978',
      },
      fontFamily: {
        'kosugi-maru': ['Kosugi Maru'],
        'varela-round': ['Varela Round'],
      },
      width: {
        38: '152px',
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
