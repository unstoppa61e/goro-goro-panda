import NumberKey from './NumberKey';
import { Mode } from '../../types';

type Props = {
  handleInputNumber: (number: string) => void;
  mode: Mode;
  numberKeysMistaken: boolean[];
};

export const keyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const Keyboard = ({ handleInputNumber, mode, numberKeysMistaken }: Props) => {
  const keys = keyNumbers.map((keyNumber: number) => (
    <NumberKey
      keyNumber={keyNumber}
      handleInputNumber={handleInputNumber}
      key={keyNumber}
      mode={mode}
      isMistaken={numberKeysMistaken[keyNumber]}
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

  return (
    <div className="w-full" data-testid="keyboard">
      {keyRows}
    </div>
  );
};

export default Keyboard;
