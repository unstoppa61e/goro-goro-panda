type numberTileNumber = {
  value: string;
  id: number;
  isMistaken: boolean;
  isClosed: boolean;
  isFocused: boolean;
};

type Props = {
  tileNumber: numberTileNumber;
};
const NumberTile = ({ tileNumber }: Props) => {
  return (
    <div className="flex justify-center items-center w-6 h-7 bg-white rounded text-black text-2xl font-bold">
      {tileNumber.value}
    </div>
  );
};

export default NumberTile;
