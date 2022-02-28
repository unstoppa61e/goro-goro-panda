type Props = {
  keyNumber: number;
  handleInputNumber: (number: string) => void;
};

const NumberKey = ({ keyNumber, handleInputNumber }: Props) => {
  return (
    <button
      className="w-16 h-16 flex justify-center items-center no-tap-highlighting cursor-default"
      onClick={() => handleInputNumber(keyNumber.toString())}
    >
      <p className="w-14 h-14 rounded-2xl border-4 border-black bg-white text-4xl text-black font-bold flex justify-center items-center active:scale-90 active:bg-gray-500 cursor-pointer">
        {keyNumber}
      </p>
    </button>
  );
};

export default NumberKey;
