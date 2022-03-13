import { useCallback } from 'react';
import { STAGE, StageType } from '../../types';
import { rangeEnds } from '../../lib/rangeEnds';

type Props = {
  stageNumber: string;
  stageType: StageType;
};

const StageDescription = ({ stageNumber, stageType }: Props) => {
  const displayStage = useCallback(
    (stageNumber: string) => {
      const circledNumbers: { [key: string]: string } = {
        '1': '①',
        '2': '②',
        '3': '③',
        '4': '④',
        '5': '⑤',
        '6': '⑥',
        '7': '⑦',
        '8': '⑧',
        '9': '⑨',
        '10': '⑩',
      };

      const stageName = stageType === STAGE.Normal ? 'ステージ' : '【まとめ】';

      return (
        <div>
          {stageName}
          {stageType === STAGE.Normal ? circledNumbers[stageNumber] : ''}
        </div>
      );
    },
    [stageType],
  );

  const displayDigitsRange = useCallback(
    (stageNumber: string) => {
      const [startDigit, endDigit] = rangeEnds(stageNumber, stageType);

      return (
        <div>
          小数第{startDigit}
          <span className="font-mono">~</span>
          {endDigit}位を覚えよう
        </div>
      );
    },
    [stageType],
  );

  return (
    <h1 className="flex font-kosugi-maru">
      {displayStage(stageNumber)}
      <span className="ml-2" />
      {displayDigitsRange(stageNumber)}
    </h1>
  );
};

export default StageDescription;
