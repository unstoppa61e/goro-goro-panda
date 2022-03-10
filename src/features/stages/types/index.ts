export const MODE = {
  Remember: 'remember',
  Type: 'type',
  Clear: 'clear',
} as const;
export type Mode = typeof MODE[keyof typeof MODE];

export const CONDITION = {
  Normal: 'normal',
  Success: 'success',
  Failure: 'failure',
  LeveledUp: 'leveled up',
} as const;
export type Condition = typeof CONDITION[keyof typeof CONDITION];

export type numberTileNumber = {
  value: string;
  isClosed: boolean;
  isFocused: boolean;
  isCorrectLast: boolean;
};

export type wordplayTile = {
  isTarget: boolean;
  isSolved: boolean;
  numbers: numberTileNumber[];
};
