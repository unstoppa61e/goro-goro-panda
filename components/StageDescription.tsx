type Props = {
  stageNumber: string;
};

const StageDescription = ({ stageNumber }: Props) => {
  const displayStage = (stageNumber: number): string => {
    const circledNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];

    return `ステージ${circledNumbers[stageNumber - 1]}`;
  };
  const displayDigitsRange = (stageNumber: number): string => {
    const startDigit: number = 10 * (stageNumber - 1) + 1;
    const endDigit = startDigit + 9;

    return `円周率の${startDigit}~${endDigit}ケタをおぼえよう`;
  };

  return (
    <h1>
      {displayStage(parseInt(stageNumber))}
      <span className="ml-4" />
      {displayDigitsRange(parseInt(stageNumber))}
    </h1>
  );
};

export default StageDescription;
