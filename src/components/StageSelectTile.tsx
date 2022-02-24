import Image from 'next/image';

type Props = {
  tileNumber: string;
  isLocked: boolean;
  firstTile: boolean;
};
function StageSelectTile({ tileNumber, isLocked, firstTile }: Props) {
  const srcPath = (isLocked: boolean, tileNumber: string): string => {
    if (isLocked) return '/mark_question.png';

    return `/wordplays/${tileNumber}.png`;
  };

  const piStartIndicator = <div className="absolute -ml-3">3.</div>;

  return (
    <>
      <div className="pointer-events-none">
        <Image
          src={srcPath(isLocked, tileNumber)}
          width={50}
          height={50}
          objectFit="contain"
          alt="wordplay"
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
        />
      </div>
      <div className="text-center text-white text-2xl font-varela-round -mt-2 relative">
        {firstTile ? piStartIndicator : null}
        {tileNumber}
      </div>
    </>
  );
}

export default StageSelectTile;
