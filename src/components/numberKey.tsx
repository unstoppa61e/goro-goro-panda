type Props = {
  keyNumber: number;
  handleInputNumber: (number: string) => void;
};

const NumberKey = ({ keyNumber, handleInputNumber }: Props) => {
  return (
    <button
      className="w-14 h-14 rounded-2xl border-4 border-black bg-white text-4xl text-black font-bold"
      onClick={() => handleInputNumber(keyNumber.toString())}
    >
      {keyNumber}
    </button>
  );
};

export default NumberKey;
