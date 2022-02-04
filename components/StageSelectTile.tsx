import Image from "next/image";

type Props = {
  tileNumber: string;
};
const StageSelectTile = ({ tileNumber }: Props) => {
  return (
    <>
      <Image
        src={"/wordplays/" + tileNumber + ".png"}
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
