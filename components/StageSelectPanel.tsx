import StageSelectTile from './StageSelectTile';

import Link from "next/link";

type Props = {
  panelNumber: string;
  stage: number;
  isLocked: boolean;
};
function StageSelectPanel({ panelNumber, stage, isLocked }: Props) {
  const tileNumbers = [];
  for (let i = 0; i < panelNumber.length; i += 2) {
    tileNumbers.push(panelNumber.slice(i, i + 2));
  }
  const backGroundColor = (stage: number): string => {
    if (isLocked) return 'bg-locked';
    // Tailwindはクライアントサイドでのランタイムを考慮しないため、クラス名は静的である必要がある。
    const colors: string[] = [
      'bg-stage-1',
      'bg-stage-2',
      'bg-stage-3',
      'bg-stage-4',
      'bg-stage-5',
      'bg-stage-6',
      'bg-stage-7',
      'bg-stage-8',
      'bg-stage-9',
      'bg-stage-10',
    ];

    return colors[stage - 1];
  };
  const stagePath = (isLocked: boolean, stage: number): string => {
    if (isLocked) return "";
    return `/stages/${stage}`;
  };
  const cursorAppearance = (isLocked: boolean): string => {
    return isLocked ? "cursor-not-allowed" : "";
  };

  return (
    <Link href={stagePath(isLocked, stage)}>
      <a
        className={`flex py-2.5 mb-5 border-5 rounded-md w-80 ${backGroundColor(
          stage
        )} ${cursorAppearance(isLocked)}`}
      >
        <div className="text-white text-xl mt-7 ml-7">{stage}</div>
        <ul className="flex">
          {tileNumbers.map((tileNumber: string, index: number) => (
            <li key={index}>
              <StageSelectTile tileNumber={tileNumber} isLocked={isLocked} />
            </li>
          ))}
        </ul>
      </a>
    </Link>
  );
}

export default StageSelectPanel;
