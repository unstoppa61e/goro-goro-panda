import NumberKey from './NumberKey';
import { Mode } from '../pages/stages/[stage]';

type Props = {
  handleInputNumber: (number: string) => void;
  mode: Mode;
};

const Keyboard = ({ handleInputNumber, mode }: Props) => {
  const keyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const keys = keyNumbers.map((keyNumber: number) => (
    <NumberKey
      keyNumber={keyNumber}
      handleInputNumber={handleInputNumber}
      key={keyNumber}
      mode={mode}
    />
  ));
  const keyRows = [];
  for (let i = 0; i < keys.length; i += keys.length / 2) {
    keyRows.push(
      <div className="flex" key={i}>
        {keys.slice(i, i + keys.length / 2)}
      </div>,
    );
  }

  return <div className="w-full">{keyRows}</div>;
};

export default Keyboard;
