import Image from "next/image";

type Props = {
  tileNumber: string;
  isLocked: boolean;
};
const StageSelectTile = ({ tileNumber, isLocked }: Props) => {
  const srcPath = (isLocked: boolean, tileNumber: string): string => {
    if (isLocked) return "/mark_question.png";
    return `/wordplays/${tileNumber}.png`;
  };
  return (
    <>
      <Image
        src={srcPath(isLocked, tileNumber)}
        width={50}
        height={50}
        objectFit="contain"
        alt="wordplay"
      />
      <div className="text-center text-white text-3xl">{tileNumber}</div>
    </>
  );
};

export default StageSelectTile;
