import Link from 'next/link';

import StageSelectPanelContent from './StageSelectPanelContent';
import {
  clearedStageDefaultValue,
  useClearedStage,
} from '../../hooks/useClearedStage';
import { useCallback } from 'react';

type Props = {
  panelNumber: string;
  stage: number;
  clearedStageValues: string[];
  clearCountValues: string[];
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

function StageSelectPanel({
  panelNumber,
  stage,
  clearedStageValues,
  clearCountValues,
}: Props) {
  const clearedStage = useClearedStage(
    clearedStageDefaultValue,
    clearedStageValues,
  )[0];

  const isLocked = stage > clearedStage + 1;

  const panelTestId = useCallback(
    (stage: number): string => `stage-select-panel-${stage}`,
    [],
  );

  const panelStyling = 'pt-1.5 pb-1 flex rounded-xl w-80 box-content';

  // Linkタグにhrefを指定しないとWarningが出るため、冗長ではあるが２パターンに書き分けている
  if (isLocked) {
    return (
      <div
        className={`${panelStyling} bg-locked cursor-not-allowed`}
        data-testid={panelTestId(stage)}
      >
        <StageSelectPanelContent
          panelNumber={panelNumber}
          stage={stage}
          isLocked={isLocked}
          clearCountValues={clearCountValues}
        />
      </div>
    );
  } else {
    return (
      <Link href={stagePath(stage)}>
        <a
          className={`${panelStyling} sm:hover:border-6 sm:hover:border-focused active:border-6 active:border-focused ${backGroundColor(
            stage,
          )} animate-pulse animate-infinite relative`}
          data-testid={panelTestId(stage)}
        >
          <StageSelectPanelContent
            panelNumber={panelNumber}
            stage={stage}
            isLocked={isLocked}
            clearCountValues={clearCountValues}
          />
        </a>
      </Link>
    );
  }
}

export default StageSelectPanel;
