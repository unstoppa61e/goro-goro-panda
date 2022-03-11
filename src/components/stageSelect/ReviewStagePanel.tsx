import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import {
  clearedReviewDefaultValue,
  useClearedReview,
} from '../../hooks/useClearedReview';
import StageClearCount from './StageClearCount';

type Props = {
  reviewNumber: number;
  clearedReviewValues: string[];
  stageClearCountValues: string[];
};

const ReviewStagePanel = ({
  reviewNumber,
  clearedReviewValues,
  stageClearCountValues,
}: Props) => {
  const clearedReview = useClearedReview(
    clearedReviewDefaultValue,
    clearedReviewValues,
  )[0];

  const isLocked = reviewNumber > clearedReview + 1;

  const testId = `review-select-panel-${reviewNumber}`;
  const stagePath = `/reviews/${reviewNumber}`;

  const className =
    'flex justify-center items-center rounded-xl w-80 h-24 box-content bg-gradient-to-r from-blue-300 via-green-200 to-yellow-300';

  const locked = (
    <div
      className={`${className} justify-center cursor-not-allowed pointer-events-none`}
      data-testid={testId}
    >
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
  );

  const unlocked = (
    <Link href={stagePath}>
      <a
        className={`${className} sm:hover:border-6 sm:hover:border-focused active:border-6 active:border-focused animate-pulse animate-infinite cursor-pointer relative`}
        data-testid={testId}
      >
        <div className="absolute -top-1 left-5">
          <StageClearCount
            stage={reviewNumber}
            stageClearCountValues={stageClearCountValues}
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
