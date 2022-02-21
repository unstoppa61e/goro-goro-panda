type Props = {
  stageNumber: string;
};

const StageDescription = ({ stageNumber }: Props) => {
  const displayStage = (stageNumber: string) => {
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

    return <div>ステージ{circledNumbers[stageNumber]}</div>;
  };
  const displayDigitsRange = (stageNumber: number) => {
    const startDigit: number = 10 * (stageNumber - 1) + 1;
    const endDigit = startDigit + 9;

    return (
      <div>
        円周率の{startDigit}
        <span className="font-mono">~</span>
        {endDigit}ケタを覚えよう
      </div>
    );
  };

  return (
    <h1 className="mt-1 flex font-kosugi-maru">
      {displayStage(stageNumber)}
      <span className="ml-4" />
      {displayDigitsRange(parseInt(stageNumber))}
    </h1>
  );
};

export default StageDescription;
