import Image from 'next/image';
import NumberTile from './NumberTile';

import { MODE, Mode, wordplayTile } from '../pages/stages/[stage]';

type Props = {
  mode: Mode;
  tile: wordplayTile;
};

const WordplayTile = ({ mode, tile }: Props) => {
  const wordplayImageSrc = () => {
    const str: string = tile.numbers
      .map((eachNumber) => eachNumber.value)
      .join('');

    return `/wordplays/${str}.png`;
  };

  const numberTiles = tile.numbers.map((numberTileNumber, index) => {
    return (
      <li key={index}>
        <NumberTile tileNumber={numberTileNumber} isTarget={tile.isTarget} />
      </li>
    );
  });

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
          ? 'bg-focused ease-in'
          : ''
      }`}
    >
      <div className="h-full w-14 flex flex-col justify-between">
        <div className="flex justify-center items-center h-14 bg-stage-1 rounded relative">
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
              onContextMenu={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
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
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
        <ul className="flex justify-between">{numberTiles}</ul>
      </div>
    </div>
  );
};

export default WordplayTile;
