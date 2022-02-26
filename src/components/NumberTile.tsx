import { numberTileNumber } from '../pages/stages/[stage]';
import FireworkAnimation from './FireworkAnimation';

type Props = {
  tileNumber: numberTileNumber;
  isTarget: boolean;
};
const NumberTile = ({ tileNumber, isTarget }: Props) => {
  const mask = (
    <div className="bg-black bg-opacity-50 rounded absolute w-full h-full" />
  );

  const animation = (
    <div className="absolute">
      <FireworkAnimation />
    </div>
  );

  return (
    <div
      className={`flex justify-center items-center w-6 h-7 ${
        tileNumber.isFocused
          ? 'duration-500 bg-focused'
          : tileNumber.isMistaken
          ? 'duration-500 bg-mistaken'
          : 'bg-white'
      } rounded text-black text-2xl font-bold relative`}
    >
      {tileNumber.wasCorrect ? animation : null}
      <div className="transition-all ease-in duration-200 relative flex justify-center items-center font-sans">
        <div
          className={`absolute ${
            tileNumber.isClosed ? 'rotate-y-90' : 'rotate-y-0 delay-200'
          }`}
        >
          {tileNumber.value}
        </div>
        <div
          className={`pb-2 ${
            tileNumber.isFocused ? 'rotate-y-0 delay-200' : 'rotate-y-90'
          }`}
        >
          _
        </div>
      </div>
      {isTarget ? null : mask}
    </div>
  );
};

export default NumberTile;
