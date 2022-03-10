import { useCallback } from 'react';

type Props = {
  stageNumber: string;
};

export const rangeEnds = (stageNumber: string): [number, number] => {
  const start: number = 10 * (parseInt(stageNumber) - 1) + 1;
  const end: number = start + 9;

  return [start, end];
};

const StageDescription = ({ stageNumber }: Props) => {
  const displayStage = useCallback((stageNumber: string) => {
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
  }, []);

  const displayDigitsRange = useCallback((stageNumber: string) => {
    const [startDigit, endDigit] = rangeEnds(stageNumber);

    return (
      <div>
        小数第{startDigit}
        <span className="font-mono">~</span>
        {endDigit}位を覚えよう
      </div>
    );
  }, []);

  return (
    <h1 className="flex font-kosugi-maru">
      {displayStage(stageNumber)}
      <span className="ml-2" />
      {displayDigitsRange(stageNumber)}
    </h1>
  );
};

export default StageDescription;
