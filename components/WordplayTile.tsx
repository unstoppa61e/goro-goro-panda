import Image from 'next/image';
import NumberTile from './NumberTile';

type Props = {
  tilePiNumber: string;
};

const WordplayTile = ({ tilePiNumber }: Props) => {
  const srcPath = (isLocked: boolean, tilePiNumber: string): string => {
    if (isLocked) return '/mark_question.png';

    return `/wordplays/${tilePiNumber}.png`;
  };

  const numberTiles = tilePiNumber.split('').map((numberTileNumber, index) => {
    return (
      <li key={index}>
        <NumberTile tileNumber={numberTileNumber} />
      </li>
    );
  });

  return (
    <div className="flex items-center justify-center h-24 w-16 py-1 rounded bg-focused">
      <div className="h-full w-14 flex flex-col justify-between">
        <div className="flex justify-center items-center h-14 bg-stage-1 rounded">
          <Image
            src={srcPath(false, tilePiNumber)}
            width={50}
            height={50}
            objectFit="contain"
            alt="wordplay"
          />
        </div>
        <ul className="flex justify-between">{numberTiles}</ul>
      </div>
    </div>
  );
};

export default WordplayTile;