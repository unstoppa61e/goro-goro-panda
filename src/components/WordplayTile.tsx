import Image from 'next/image';
import NumberTile from './NumberTile';

import {
  MODE,
  Mode,
  numberTileNumber,
  wordplayTile,
} from '../pages/stages/[stage]';
import { backGroundColor } from './StageSelectPanel';
import React from 'react';

type Props = {
  mode: Mode;
  tile: wordplayTile;
  stageNumber: string;
};

const WordplayTile = ({ mode, tile, stageNumber }: Props) => {
  const wordplayImageSrc = () => {
    const str: string = tile.numbers
      .map((eachNumber: numberTileNumber) => eachNumber.value)
      .join('');

    return `/wordplays/${str}.png`;
  };

  const numberTiles = tile.numbers.map(
    (numberTileNumber: numberTileNumber, index: number) => {
      return (
        <li key={index}>
          <NumberTile tileNumber={numberTileNumber} isTarget={tile.isTarget} />
        </li>
      );
    },
  );

  const mask = (
    <div
      className={`${
        tile.isTarget ? '' : 'bg-black'
      } bg-opacity-50 rounded absolute w-full h-full transition-all ease-in duration-500`}
    />
  );

  const isClosed = tile.isTarget && !tile.isSolved;

  return (
    <div
      className={`flex items-center justify-center h-24 w-16 py-1 rounded duration-500 ${
        mode === MODE.Remember && tile.isTarget && tile.isSolved
          ? 'bg-focused ease-in animate-tada'
          : ''
      }`}
    >
      <div className="h-full w-14 flex flex-col justify-between">
        <div
          className={`flex justify-center items-center h-14 ${backGroundColor(
            parseInt(stageNumber),
          )} rounded relative pointer-events-none`}
        >
          <div className="absolute flex justify-center items-center">
            <Image
              src={wordplayImageSrc()}
              width={50}
              height={50}
              objectFit="contain"
              alt="wordplay"
              className={`transition-all ease-in duration-200 ${
                isClosed ? 'rotate-y-90' : 'rotate-y-0 delay-200'
              }`}
              onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
                e.preventDefault()
              }
              onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
                e.preventDefault()
              }
            />
          </div>
          {mask}

          <Image
            src="/mark_question.png"
            width={50}
            height={50}
            objectFit="contain"
            alt="question mark"
            className={`transition-all ease-in duration-200 ${
              isClosed ? 'delay-200 rotate-y-0' : 'rotate-y-90'
            }`}
            onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
              e.preventDefault()
            }
            onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
              e.preventDefault()
            }
          />
        </div>
        <ul className="flex justify-between">{numberTiles}</ul>
      </div>
    </div>
  );
};

export default WordplayTile;
