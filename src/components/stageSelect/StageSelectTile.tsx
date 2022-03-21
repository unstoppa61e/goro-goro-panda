import Image from 'next/image';
import React, { useCallback } from 'react';
import { STAGE, StageType } from '../../types';

type Props = {
  tileNumber: string;
  isLocked: boolean;
  stage: number;
  firstTile: boolean;
  stageType: StageType;
};
function StageSelectTile({
  tileNumber,
  isLocked,
  stage,
  firstTile,
  stageType,
}: Props) {
  const srcPath = useCallback((tileNumber: string): string => {
    return `/wordplays/${tileNumber}.png`;
  }, []);

  const piStartIndicator = <div className="absolute -ml-2">3.</div>;

  const tileBackgroundColor =
    stageType === STAGE.Normal
      ? {
          1: 'bg-stage-1',
          2: 'bg-stage-2',
          3: 'bg-stage-3',
          4: 'bg-stage-4',
          5: 'bg-stage-5',
          6: 'bg-stage-6',
          7: 'bg-stage-7',
          8: 'bg-stage-8',
          9: 'bg-stage-9',
          10: 'bg-stage-10',
        }[stage]
      : 'bg-navy-lighter';

  const image = (
    <div className="pointer-events-none flex justify-center items-center">
      <div
        className={`flex justify-center items-center ${
          isLocked
            ? 'brightness-0 invert-0 opacity-50'
            : tileBackgroundColor
            ? tileBackgroundColor
            : ''
        }`}
      >
        <Image
          src={srcPath(tileNumber)}
          width={50}
          height={50}
          objectFit="contain"
          alt="wordplay"
          onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
          onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
        />
      </div>
    </div>
  );

  const number = (
    <div
      className={`text-center ${
        isLocked ? 'text-white' : 'text-black'
      } text-xl font-varela-round`}
    >
      {firstTile ? piStartIndicator : null}
      {isLocked ? '?' : tileNumber}
    </div>
  );

  return (
    <>
      {image}
      {number}
    </>
  );
}

export default StageSelectTile;
