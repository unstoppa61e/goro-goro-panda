import Link from 'next/link';

import StageSelectPanelContent from './StageSelectPanelContent';
import {
  clearedStageDefaultValue,
  useClearedStage,
} from '../../hooks/useClearedStage';
import { STAGE, StageType } from '../../types';

type Props = {
  panelNumber: string;
  stage: number;
  clearedStageValues: string[];
  clearCountValues: string[];
  stageType: StageType;
};

export const borderColor = (
  stage: number,
  stageType: StageType,
  isLocked: boolean,
): string => {
  if (stageType === STAGE.Review) {
    return isLocked ? 'border-focused' : 'border-white';
  }
  // Tailwindはクライアントサイドでのランタイムを考慮しないため、クラス名は静的である必要がある。
  const colors: { [key: number]: string } = {
    1: 'border-stage-1',
    2: 'border-stage-2',
    3: 'border-stage-3',
    4: 'border-stage-4',
    5: 'border-stage-5',
    6: 'border-stage-6',
    7: 'border-stage-7',
    8: 'border-stage-8',
    9: 'border-stage-9',
    10: 'border-stage-10',
  };

  const darkColors: { [key: number]: string } = {
    1: 'border-stage-1-dark',
    2: 'border-stage-2-dark',
    3: 'border-stage-3-dark',
    4: 'border-stage-4-dark',
    5: 'border-stage-5-dark',
    6: 'border-stage-6-dark',
    7: 'border-stage-7-dark',
    8: 'border-stage-8-dark',
    9: 'border-stage-9-dark',
    10: 'border-stage-10-dark',
  };

  return isLocked ? darkColors[stage] : colors[stage];
};

const reviewPanelColor =
  'bg-gradient-to-r from-blue-300 via-green-200 to-yellow-300';

export const stagePath = (stage: number): string => `/stages/${stage}`;

function StageSelectPanel({
  panelNumber,
  stage,
  clearedStageValues,
  clearCountValues,
  stageType,
}: Props) {
  const clearedStage = useClearedStage(
    clearedStageDefaultValue,
    clearedStageValues,
  )[0];

  const isLocked =
    stageType === STAGE.Normal
      ? stage > clearedStage + 1
      : stage > clearedStage / 10;

  const panelTestId =
    stageType === STAGE.Normal
      ? `stage-panel-${stage}`
      : `review-panel-${stage}`;

  const panelStyling = `pt-1.5 pb-1 flex rounded-xl w-80 box-content border-4 ${borderColor(
    stage,
    stageType,
    isLocked,
  )}`;

  // Linkタグにhrefを指定しないとWarningが出るため、冗長ではあるが２パターンに書き分けている
  if (isLocked) {
    return (
      <div
        className={`${panelStyling} bg-black bg-opacity-20 relative cursor-not-allowed`}
        data-testid={panelTestId}
      >
        <StageSelectPanelContent
          panelNumber={panelNumber}
          stage={stage}
          isLocked={isLocked}
          clearCountValues={clearCountValues}
          stageType={stageType}
        />
      </div>
    );
  } else {
    return (
      <Link href={stageType === STAGE.Normal ? stagePath(stage) : '/reviews/1'}>
        <a
          className={`${panelStyling} sm:hover:border-focused active:border-focused ${
            stageType === STAGE.Normal ? 'bg-panel-white' : reviewPanelColor
          } animate-pulse animate-infinite relative`}
          data-testid={panelTestId}
        >
          <StageSelectPanelContent
            panelNumber={panelNumber}
            stage={stage}
            isLocked={isLocked}
            clearCountValues={clearCountValues}
            stageType={stageType}
          />
        </a>
      </Link>
    );
  }
}

StageSelectPanel.defaultProps = {
  panelNumber: '',
};

export default StageSelectPanel;
