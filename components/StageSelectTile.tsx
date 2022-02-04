import Image from "next/image";

const StageSelectTile = ({ number }) => {
  return (
    <>
      <Image
        src={"/wordplays/" + number + ".png"}
        width={50}
        height={50}
        objectFit="contain"
        alt="wordplay"
      />
      <div className="text-center text-white text-3xl">{number}</div>
    </>
  );
};

export default StageSelectTile;
