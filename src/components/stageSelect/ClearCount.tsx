import React, { useCallback, useEffect, useState } from 'react';
import { STAGE_CLEAR_COUNT_STORAGE_KEY_ROOT } from '../../pages/stages/[stage]';
import Image from 'next/image';
import { STAGE, StageType } from '../../types';
import { REVIEW_CLEAR_COUNT_STORAGE_KEY_ROOT } from '../../pages/reviews/[review]';

type Props = {
  stage: number;
  clearCountValues: string[];
  stageType: StageType;
};

const ClearCount = ({ stage, clearCountValues, stageType }: Props) => {
  const [clearCount, setClearCount] = useState(0);

  useEffect(() => {
    const storageKeyClearCountRoot =
      stageType === STAGE.Normal
        ? STAGE_CLEAR_COUNT_STORAGE_KEY_ROOT
        : REVIEW_CLEAR_COUNT_STORAGE_KEY_ROOT;
    const clearCountValue = localStorage.getItem(
      `${storageKeyClearCountRoot}${stage}`,
    );
    setClearCount(
      clearCountValue === null ? 0 : clearCountValues.indexOf(clearCountValue),
    );
  }, [stage, stageType, clearCountValues]);

  const imageSize = 12;

  const scoreImage = useCallback((filename: string) => {
    return (
      <div className="pointer-events-none">
        <Image
          src={`/${filename}`}
          width={imageSize}
          height={imageSize}
          objectFit="contain"
          alt="crown"
          onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
          onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
        />
      </div>
    );
  }, []);

  const redCrowns = [];
  const crownRedImage = scoreImage('crown_red.png');
  const crownRedBasis = 20;
  for (let i = crownRedBasis; i < clearCount; i += crownRedBasis) {
    redCrowns.push(<div key={`crown-red-${i}`}>{crownRedImage}</div>);
  }
  const crowns = [];
  let remainingClearCount = clearCount % crownRedBasis;
  const crownBasis = 5;
  for (let i = 0; (i + 1) * crownBasis < remainingClearCount; i++) {
    crowns.unshift(
      <div key={`crown-${i}`}>{scoreImage(`crown_${i}.png`)}</div>,
    );
  }
  const stars = [];
  remainingClearCount %= crownBasis;
  for (let i = 0; i < remainingClearCount; i++) {
    stars.push(<div key={`star-${i}`}>{scoreImage(`star_${i}.png`)}</div>);
  }

  return (
    <div className="flex gap-x-0.5 w-72 justify-end">
      {redCrowns}
      {crowns}
      {stars}
    </div>
  );
};

export default ClearCount;
