import Link from 'next/link';

import StageSelectPanelContent from './StageSelectPanelContent';
import { useClearedStage } from '../hooks/useClearedStage';

type Props = {
  panelNumber: string;
  stage: number;
};

export const backGroundColor = (stage: number): string => {
  // Tailwindはクライアントサイドでのランタイムを考慮しないため、クラス名は静的である必要がある。
  const colors: { [key: number]: string } = {
    1: 'bg-stage-1',
    2: 'bg-stage-2',
    3: 'bg-stage-3',
    4: 'bg-stage-4',
    5: 'bg-stage-5',
    6: 'bg-stage-6',
    7: 'bg-stage-7',
    8: 'bg-stage-8',
    9: 'bg-stage-9',
    10: 'bg-stage-10',
  };

  return colors[stage];
};

export const stagePath = (stage: number): string => `/stages/${stage}`;

function StageSelectPanel({ panelNumber, stage }: Props) {
  const clearedStage = useClearedStage(0)[0];

  const isLocked = stage > parseInt(clearedStage) + 1;

  const panelTestId = (stage: number): string => `stage-select-panel-${stage}`;
  if (isLocked) {
    return (
      <div
        className="flex py-2.5 mb-5 border-5 rounded-md w-80 bg-locked cursor-not-allowed"
        data-testid={panelTestId(stage)}
      >
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
          data-testid={panelTestId(stage)}
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
