module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'unlocked': '#b7d6e8',
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
        'focused': '#fff000',
        'mistaken': '#ffb5f0',
        'ok': '#46d2aa',
        'ng': '#ff3978'
      }
    },
  },
  plugins: [],
}