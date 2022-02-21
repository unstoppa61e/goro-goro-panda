import Image from 'next/image';

type Props = {
  tileNumber: string;
  isLocked: boolean;
};
function StageSelectTile({ tileNumber, isLocked }: Props) {
  const srcPath = (isLocked: boolean, tileNumber: string): string => {
    if (isLocked) return '/mark_question.png';

    return `/wordplays/${tileNumber}.png`;
  };

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
      <div className="text-center text-white text-2xl font-varela-round -mt-2">
        {tileNumber}
      </div>
    </>
  );
}

export default StageSelectTile;
