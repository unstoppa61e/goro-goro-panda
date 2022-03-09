import { numberTileNumber } from '../pages/stages/[stage]';
import FireworkAnimation from './FireworkAnimation';

type Props = {
  tileNumber: numberTileNumber;
  isTarget: boolean;
  typeModeCount: number;
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

const NumberTile = ({ tileNumber, isTarget, typeModeCount }: Props) => {
  // const mask = (
  //   <div className="bg-black bg-opacity-50 rounded absolute w-full h-full" />
  // );

  const firework = (
    <div className="absolute">
      <FireworkAnimation />
    </div>
  );

  const animationSrc = animations[typeModeCount % animations.length];

  return (
    <div
      className={`flex justify-center items-center w-6 h-7 ${
        tileNumber.isFocused
          ? 'duration-500 bg-focused'
          : tileNumber.isMistaken
          ? 'duration-500 bg-mistaken'
          : 'bg-white'
      } ${
        tileNumber.isCorrectLast ? animationSrc : ''
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
      {isTarget ? null : null}
    </div>
  );
};

export default NumberTile;
