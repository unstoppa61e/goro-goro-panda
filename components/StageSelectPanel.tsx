import StageSelectTile from "./StageSelectTile";

type Props = {
  panelNumber: string;
  stage: number;
};
const StageSelectPanel = ({ panelNumber, stage }: Props) => {
  const tileNumbers = [];
  for (let i = 0; i < panelNumber.length; i += 2) {
    tileNumbers.push(panelNumber.slice(i, i + 2));
  }
  const backGroundColor = (stage: number): string => {
    // Tailwindはクライアントサイドでのランタイムを考慮しないため、クラス名は静的である必要がある。
    const colors: string[] = [
      "bg-stage-1",
      "bg-stage-2",
      "bg-stage-3",
      "bg-stage-4",
      "bg-stage-5",
      "bg-stage-6",
      "bg-stage-7",
      "bg-stage-8",
      "bg-stage-9",
      "bg-stage-10",
    ];
    return colors[stage - 1];
  };

  return (
    <div
      className={`flex py-2.5 mb-5 border-5 rounded-md w-80 ${backGroundColor(
        stage
      )}`}
    >
      <div className="text-white text-xl mt-7 ml-7">{stage}</div>
      <ul className="flex">
        {tileNumbers.map((tileNumber: string, index: number) => (
          <li key={index}>
            <StageSelectTile tileNumber={tileNumber} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StageSelectPanel;
