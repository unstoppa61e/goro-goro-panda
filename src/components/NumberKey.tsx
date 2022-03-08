import { MODE, Mode } from '../pages/stages/[stage]';
import { useCallback } from 'react';

type Props = {
  keyNumber: number;
  handleInputNumber: (number: string) => void;
  mode: Mode;
  isMistaken: boolean;
};

const NumberKey = ({
  keyNumber,
  handleInputNumber,
  mode,
  isMistaken,
}: Props) => {
  const onClick = useCallback(() => {
    if (isMistaken) return;
    handleInputNumber(keyNumber.toString());
  }, [handleInputNumber, isMistaken, keyNumber]);

  return (
    <button
      className="w-16 h-16 flex justify-center items-center no-tap-highlighting cursor-default"
      onClick={onClick}
    >
      <p
        className={`w-14 h-14 rounded-2xl border-4 border-black ${
          isMistaken ? 'bg-ng opacity-20' : 'bg-white cursor-pointer'
        } text-4xl text-black font-bold flex justify-center items-center active:scale-90 active:bg-gray-500 ${
          mode === MODE.Clear ? '' : 'animate-pulse animate-infinite'
        }`}
      >
        {keyNumber}
      </p>
    </button>
  );
};

export default NumberKey;
