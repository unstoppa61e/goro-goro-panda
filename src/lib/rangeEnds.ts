import { STAGE, StageType } from '../types';

export const rangeEnds = (stageNumber: string, stageType: StageType) => {
  const range = stageType === STAGE.Normal ? 10 : 100;
  const start: number = range * (parseInt(stageNumber) - 1) + 1;
  const end: number = start + (range - 1);

  return [start, end];
};
