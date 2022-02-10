type Props = {
  tileNumber: string;
};

const NumberTile = ({ tileNumber }: Props) => {
  return (
    <div className="flex justify-center items-center w-6 h-7 bg-white rounded text-black text-2xl font-bold">
      {tileNumber}
    </div>
  );
};

export default NumberTile;
