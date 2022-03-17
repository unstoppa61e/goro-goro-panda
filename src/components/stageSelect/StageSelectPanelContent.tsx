import StageSelectTile from './StageSelectTile';
import { STAGE, StageType } from '../../types';
import ClearCount from './ClearCount';
import Image from 'next/image';
import React from 'react';

type Props = {
  panelNumber: string;
  stage: number;
  isLocked: boolean;
  clearCountValues: string[];
  stageType: StageType;
};
const StageSelectPanelContent = ({
  panelNumber,
  stage,
  isLocked,
  clearCountValues,
  stageType,
}: Props) => {
  const tileNumbers = panelNumber.match(/.{2}/g)!;

  const circleColor = isLocked
    ? 'bg-locked-dark'
    : {
        1: 'bg-stage-1-dark',
        2: 'bg-stage-2-dark',
        3: 'bg-stage-3-dark',
        4: 'bg-stage-4-dark',
        5: 'bg-stage-5-dark',
        6: 'bg-stage-6-dark',
        7: 'bg-stage-7-dark',
        8: 'bg-stage-8-dark',
        9: 'bg-stage-9-dark',
        10: 'bg-stage-10-dark',
      }[stage];

  const stageIndicator = (
    <div className="flex items-center gap-x-1 text-white">
      <p className="text-sm font-mono font-bold">ステージ</p>
      <div
        className={`h-6 w-6 flex justify-center items-center text-sm font-varela-round ${
          circleColor ? circleColor : ''
        } bg-opacity-70 rounded-full`}
      >
        {stage}
      </div>
    </div>
  );

  const reviewIndicator = (
    <p className="text-white text-sm font-mono font-bold">スペシャルステージ</p>
  );

  const image = (
    <div
      className={`${
        isLocked ? 'brightness-0 invert blur-xs' : ''
      } flex justify-center items-center mr-2.5 pointer-events-none h-[78px]`}
    >
      <Image
        src="/pandas/panda_happy_1.png"
        alt="happy panda"
        width={80}
        height={68}
        objectFit="contain"
        onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
          e.preventDefault()
        }
        onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
          e.preventDefault()
        }
      />
    </div>
  );

  const tiles =
    stageType === STAGE.Review ? null : (
      <ul className="w-full flex justify-between px-4">
        {tileNumbers.map((tileNumber: string, index: number) => (
          <li key={index}>
            <StageSelectTile
              tileNumber={tileNumber}
              isLocked={isLocked}
              firstTile={stage === 1 && index === 0}
            />
          </li>
        ))}
      </ul>
    );

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center ml-3.5 mr-2.5">
        {stageType === STAGE.Normal ? stageIndicator : reviewIndicator}
        <ClearCount
          stage={stage}
          clearCountValues={clearCountValues}
          stageType={stageType}
        />
      </div>
      <hr className="border-dashed mt-1 mb-2" />
      {stageType === STAGE.Normal ? tiles : image}
    </div>
  );
};

export default StageSelectPanelContent;
