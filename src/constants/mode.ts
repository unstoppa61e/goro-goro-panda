const Mode = {
  Remember: 'remember',
  Type: 'type',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

export default Mode;
