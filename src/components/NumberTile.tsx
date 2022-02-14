import { numberTileNumber } from '../pages/stages/[stage]';

type Props = {
  tileNumber: numberTileNumber;
  isTarget: boolean;
};
const NumberTile = ({ tileNumber, isTarget }: Props) => {
  const mask = (
    <div className="bg-black bg-opacity-50 rounded absolute w-full h-full" />
  );

  return (
    <div
      className={`flex justify-center items-center w-6 h-7 ${
        tileNumber.isFocused ? 'duration-500 bg-focused' : 'bg-white'
      } rounded text-black text-2xl font-bold relative`}
    >
      <div
        className={`transition-all ease-in duration-200 ${
          tileNumber.isClosed ? 'rotate-y-90' : 'rotate-y-0 delay-200'
        }`}
      >
        {tileNumber.value}
      </div>
      {isTarget ? null : mask}
    </div>
  );
};

export default NumberTile;
