import NumberKey from './numberKey';

type Props = {
  handleInputNumber: (number: string) => void;
};

const Keyboard = ({ handleInputNumber: handleInputNumber }: Props) => {
  const keyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const keys = keyNumbers.map((keyNumber) => (
    <NumberKey
      keyNumber={keyNumber}
      handleInputNumber={handleInputNumber}
      key={keyNumber}
    />
  ));
  const keyRows = [];
  for (let i = 0; i < keys.length; i += keys.length / 2) {
    keyRows.push(
      <div
        className={`w-80 flex justify-between ${i === 0 ? '' : 'mt-2'}`}
        key={i}
      >
        {keys.slice(i, i + keys.length / 2)}
      </div>,
    );
  }

  return <div className="mt-3">{keyRows}</div>;
};

export default Keyboard;
