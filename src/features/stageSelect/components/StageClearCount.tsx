import React, { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEY_STAGE_CLEAR_COUNT_ROOT } from '../../../pages/stages/[stage]';
import Image from 'next/image';

type Props = {
  stage: number;
  stageClearCountValues: string[];
};

const StageClearCount = ({ stage, stageClearCountValues }: Props) => {
  const [clearCount, setClearCount] = useState(0);

  useEffect(() => {
    const stageClearCountValue = localStorage.getItem(
      `${STORAGE_KEY_STAGE_CLEAR_COUNT_ROOT}${stage}`,
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
    redCrowns.push(crownRedImage);
  }
  const crowns = [];
  let remainingClearCount = clearCount % crownRedBasis;
  const crownBasis = 5;
  for (let i = 0; (i + 1) * crownBasis < remainingClearCount; i++) {
    crowns.unshift(scoreImage(`crown_${i}.png`));
  }
  const stars = [];
  remainingClearCount %= crownBasis;
  for (let i = 0; i < remainingClearCount; i++) {
    stars.push(scoreImage(`star_${i}.png`));
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
