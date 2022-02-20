type Props = {
  stageNumber: string;
};

const StageDescription = ({ stageNumber }: Props) => {
  const displayStage = (stageNumber: string): string => {
    const circledNumbers: { [key: string]: string } = {
      '1': '①',
      '2': '②',
      '3': '③',
      '4': '④',
      '5': '⑤',
      '6': '⑥',
      '7': '⑦',
      '8': '⑧',
      '9': '⑨',
      '10': '⑩',
    };

    return `ステージ${circledNumbers[stageNumber]}`;
  };
  const displayDigitsRange = (stageNumber: number): string => {
    const startDigit: number = 10 * (stageNumber - 1) + 1;
    const endDigit = startDigit + 9;

    return `円周率の${startDigit}~${endDigit}ケタをおぼえよう`;
  };

  return (
    <h1 className="mt-1">
      {displayStage(stageNumber)}
      <span className="ml-4" />
      {displayDigitsRange(parseInt(stageNumber))}
    </h1>
  );
};

export default StageDescription;
