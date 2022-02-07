import Link from 'next/link';

import StageSelectPanelContent from './StageSelectPanelContent';

type Props = {
  panelNumber: string;
  stage: number;
  isLocked: boolean;
};
function StageSelectPanel({ panelNumber, stage, isLocked }: Props) {
  const backGroundColor = (stage: number): string => {
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
  const stagePath = (stage: number): string => `/stages/${stage}`;
  if (isLocked) {
    return (
      <div className="flex py-2.5 mb-5 border-5 rounded-md w-80 bg-locked cursor-not-allowed">
        <StageSelectPanelContent
          panelNumber={panelNumber}
          stage={stage}
          isLocked={isLocked}
        />
      </div>
    );
  } else {
    return (
      <Link href={stagePath(stage)}>
        <a
          className={`flex py-2.5 mb-5 border-5 rounded-md w-80 ${backGroundColor(
            stage,
          )}`}
        >
          <StageSelectPanelContent
            panelNumber={panelNumber}
            stage={stage}
            isLocked={isLocked}
          />
        </a>
      </Link>
    );
  }
}

export default StageSelectPanel;
