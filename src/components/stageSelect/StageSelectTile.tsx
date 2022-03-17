import Image from 'next/image';
import React, { useCallback } from 'react';

type Props = {
  tileNumber: string;
  isLocked: boolean;
  firstTile: boolean;
};
function StageSelectTile({ tileNumber, isLocked, firstTile }: Props) {
  const srcPath = useCallback((tileNumber: string): string => {
    return `/wordplays/${tileNumber}.png`;
  }, []);

  const piStartIndicator = <div className="absolute -ml-2">3.</div>;

  const questionImage = (
    <div className="absolute z-10">
      <Image
        src="/mark_question.png"
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
  );

  const image = (
    <div className="pointer-events-none relative">
      {isLocked ? questionImage : null}
      <div className={`${isLocked ? 'brightness-0 invert blur-xs' : ''}`}>
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
    <div className="text-center text-white text-xl font-varela-round -mt-2">
      {firstTile ? piStartIndicator : null}
      {tileNumber}
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
