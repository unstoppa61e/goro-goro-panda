type numberTileNumber = {
  value: string;
  id: number;
  isMistaken: boolean;
  isClosed: boolean;
  isFocused: boolean;
};

type Props = {
  tileNumber: numberTileNumber;
  isTarget: boolean;
};
const NumberTile = ({ tileNumber, isTarget }: Props) => {
  const mask = (
    <div className="bg-black bg-opacity-50 rounded absolute w-full h-full" />
  );

  return (
    <div className="flex justify-center items-center w-6 h-7 bg-white rounded text-black text-2xl font-bold relative">
      {tileNumber.value}
      {isTarget ? null : mask}
    </div>
  );
};

export default NumberTile;
