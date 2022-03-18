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
      const stageName = stageType === STAGE.Normal ? 'ステージ' : 'スペシャル';

      return (
        <div className="absolute h-9 left-2 top-0 w-14 px-3 text-center bg-ribbon flex-col justify-center items-center z-10 after:absolute after:left-0 after:top-full after:h-0 after:w-0 after:border-l-ribbon after:border-r-ribbon after:border-l-28 after:border-r-28 after:border-b-8 after:border-b-transparent ">
          <div
            className={`w-14 -ml-3 text-sm scale-75 ${
              stageType === STAGE.Review ? 'mt-2.5' : ''
            }`}
          >
            {stageName}
          </div>
          {stageType === STAGE.Normal ? (
            <div className="-mt-1.5 flex justify-center font-bold">
              {stageNumber}
            </div>
          ) : (
            ''
          )}
        </div>
      );
    },
    [stageType],
  );

  const displayDigitsRange = useCallback(
    (stageNumber: string) => {
      const [startDigit, endDigit] = rangeEnds(stageNumber, stageType);

      return (
        <div className="w-64 flex justify-center">
          小数第{startDigit}
          <span className="font-mono">~</span>
          {endDigit}位を覚えよう
        </div>
      );
    },
    [stageType],
  );

  return (
    <h1 className="flex items-center font-kosugi-maru border-2 w-full bg-description rounded-lg border-white relative h-12">
      {displayStage(stageNumber)}
      <span className="ml-14" />
      {displayDigitsRange(stageNumber)}
    </h1>
  );
};

export default StageDescription;
