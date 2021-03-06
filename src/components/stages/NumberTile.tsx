import { MODE, Mode, numberTileNumber } from '../../types';
import FireworkAnimation from './FireworkAnimation';

type Props = {
  tileNumber: numberTileNumber;
  isTarget: boolean;
  typeModeCount: number;
  mode: Mode;
};

const animations = [
  'animate-swing',
  'animate-rubberBand',
  'animate-headShake',
  'animate-heartBeat',
  'animate-bounce',
  'animate-jello',
  'animate-wobble',
];

const NumberTile = ({ tileNumber, isTarget, typeModeCount, mode }: Props) => {
  const mask = (
    <div className="bg-black bg-opacity-50 rounded absolute w-full h-full" />
  );

  const firework = (
    <div className="absolute">
      <FireworkAnimation />
    </div>
  );

  const animationSrc = animations[typeModeCount % animations.length];

  return (
    <div
      className={`flex justify-center items-center w-6.5 h-7 ${
        tileNumber.isFocused ? 'duration-500 bg-focused' : 'bg-white'
      } ${
        tileNumber.isCorrectLast && mode !== MODE.Clear ? animationSrc : ''
      } rounded text-black text-2xl font-bold relative`}
    >
      {tileNumber.isCorrectLast ? firework : null}
      <div className="relative flex justify-center items-center font-sans">
        <div className={`absolute ${tileNumber.isClosed ? 'invisible' : ''}`}>
          {tileNumber.value}
        </div>
        <div className={`pb-2 ${tileNumber.isFocused ? '' : 'invisible'}`}>
          _
        </div>
      </div>
      {isTarget ? null : mask}
    </div>
  );
};

export default NumberTile;
