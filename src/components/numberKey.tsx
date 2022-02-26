type Props = {
  keyNumber: number;
  handleInputNumber: (number: string) => void;
};

const NumberKey = ({ keyNumber, handleInputNumber }: Props) => {
  return (
    <button
      className="w-14 h-14 rounded-2xl border-4 border-black bg-white text-4xl text-black font-bold active:scale-90 active:bg-gray-500"
      onClick={() => handleInputNumber(keyNumber.toString())}
    >
      {keyNumber}
    </button>
  );
};

export default NumberKey;
