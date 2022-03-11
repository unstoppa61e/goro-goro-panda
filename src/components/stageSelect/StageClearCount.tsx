import React, { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEY_CLEAR_COUNT_ROOT } from '../../pages/stages/[stage]';
import Image from 'next/image';
import { STAGE, StageType } from '../../types';
import { STORAGE_KEY_REVIEW_CLEAR_COUNT_ROOT } from '../../pages/reviews/[review]';

type Props = {
  stage: number;
  stageClearCountValues: string[];
  stageType: StageType;
};

const StageClearCount = ({
  stage,
  stageClearCountValues,
  stageType,
}: Props) => {
  const [clearCount, setClearCount] = useState(0);

  useEffect(() => {
    const storageKeyClearCountRoot =
      stageType === STAGE.Normal
        ? STORAGE_KEY_CLEAR_COUNT_ROOT
        : STORAGE_KEY_REVIEW_CLEAR_COUNT_ROOT;
    const stageClearCountValue = localStorage.getItem(
      `${storageKeyClearCountRoot}${stage}`,
    );
    setClearCount(
      stageClearCountValue === null
        ? 0
        : stageClearCountValues.indexOf(stageClearCountValue),
    );
  }, [stage, stageClearCountValues]);

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

export default StageClearCount;
