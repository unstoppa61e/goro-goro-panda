import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import {
  clearedReviewDefaultValue,
  useClearedReview,
} from '../../hooks/useClearedReview';
import ClearCount from './ClearCount';
import { STAGE } from '../../types';
import {
  clearedStageDefaultValue,
  useClearedStage,
} from '../../hooks/useClearedStage';

type Props = {
  reviewNumber: number;
  clearedStageValues: string[];
  clearedReviewValues: string[];
  clearCountValues: string[];
};

const hyperColorParadise = [
  'bg-gradient-to-r',
  'from-blue-300',
  'via-green-200',
  'to-yellow-300',
];

const ReviewStagePanel = ({
  reviewNumber,
  clearedStageValues,
  clearedReviewValues,
  clearCountValues,
}: Props) => {
  const clearedStage = useClearedStage(
    clearedStageDefaultValue,
    clearedStageValues,
  )[0];
  const clearedReview = useClearedReview(
    clearedReviewDefaultValue,
    clearedReviewValues,
  )[0];

  console.log(clearedStage);
  const isLocked = clearedStage < 10 || reviewNumber > clearedReview + 1;

  const testId = `review-select-panel-${reviewNumber}`;
  const stagePath = `/reviews/${reviewNumber}`;
  const className = `flex justify-center items-center rounded-xl w-80 h-24 box-content ${hyperColorParadise.join(
    ' ',
  )}`;

  const locked = (
    <div className={`${className} cursor-not-allowed`} data-testid={testId}>
      <div className="flex justify-center items-center pointer-events-none">
        <Image
          src="/lock.png"
          alt="lock"
          width={120}
          height={72}
          objectFit="contain"
          onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
          onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
        />
      </div>
    </div>
  );

  const unlocked = (
    <Link href={stagePath}>
      <a
        className={`${className} sm:hover:border-6 sm:hover:border-focused active:border-6 active:border-focused animate-pulse animate-infinite cursor-pointer relative`}
        data-testid={testId}
      >
        <div className="absolute -top-1 left-5">
          <ClearCount
            stage={reviewNumber}
            clearCountValues={clearCountValues}
            stageType={STAGE.Review}
          />
        </div>
        <div className="flex items-center mr-2.5 pointer-events-none">
          <Image
            src="/pandas/panda_happy_1.png"
            alt="happy panda"
            width={120}
            height={72}
            objectFit="contain"
            onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
              e.preventDefault()
            }
            onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
              e.preventDefault()
            }
          />
        </div>
      </a>
    </Link>
  );

  return <>{isLocked ? locked : unlocked}</>;
};

export default ReviewStagePanel;
