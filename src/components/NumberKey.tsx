import { MODE, Mode } from '../pages/stages/[stage]';

type Props = {
  keyNumber: number;
  handleInputNumber: (number: string) => void;
  mode: Mode;
};

const NumberKey = ({ keyNumber, handleInputNumber, mode }: Props) => {
  return (
    <button
      className="w-16 h-16 flex justify-center items-center no-tap-highlighting cursor-default"
      onClick={() => handleInputNumber(keyNumber.toString())}
    >
      <p
        className={`w-14 h-14 rounded-2xl border-4 border-black bg-white text-4xl text-black font-bold flex justify-center items-center active:scale-90 active:bg-gray-500 cursor-pointer ${
          mode === MODE.Clear ? '' : 'animate-pulse animate-infinite'
        }`}
      >
        {keyNumber}
      </p>
    </button>
  );
};

export default NumberKey;
