import React, { useEffect, useState } from 'react';
import { STORAGE_KEY_STAGE_CLEAR_COUNT_ROOT } from '../pages/stages/[stage]';
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
  }, []);

  const marks = [];
  const crownBasis = 5;
  const imageSize = 12;
  for (let i = crownBasis; i < clearCount; i += crownBasis) {
    marks.push(
      <div className="pointer-events-none">
        <Image
          src="/crown.png"
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
      </div>,
    );
  }
  const starCount = clearCount % crownBasis;
  for (let i = 0; i < starCount; i++) {
    marks.push(
      <div className="pointer-events-none">
        <Image
          src="/star_yellow.png"
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
      </div>,
    );
  }

  return <div className="flex gap-x-0.5 w-72 justify-end">{marks}</div>;
};

export default StageClearCount;
