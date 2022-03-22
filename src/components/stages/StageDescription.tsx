import React, { useCallback } from 'react';
import { STAGE, StageType } from '../../types';
import { rangeEnds } from '../../lib/rangeEnds';
import { IconContext } from 'react-icons';
import { IoArrowBackCircle } from 'react-icons/io5';
import Link from 'next/link';

type Props = {
  stageNumber: string;
  stageType: StageType;
};

export const stageColor = (stage: number, stageType: StageType): string => {
  if (stageType === STAGE.Review) {
    return 'bg-navy-lightest';
  }

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

const stageColorDark = (stage: number, stageType: StageType): string => {
  if (stageType === STAGE.Review) return 'bg-navy-darkest';
  // Tailwindはクライアントサイドでのランタイムを考慮しないため、クラス名は静的である必要がある。
  const colors: { [key: number]: string } = {
    1: 'bg-stage-1-dark',
    2: 'bg-stage-2-dark',
    3: 'bg-stage-3-dark',
    4: 'bg-stage-4-dark',
    5: 'bg-stage-5-dark',
    6: 'bg-stage-6-dark',
    7: 'bg-stage-7-dark',
    8: 'bg-stage-8-dark',
    9: 'bg-stage-9-dark',
    10: 'bg-stage-10-dark',
  };

  return colors[stage];
};

const ribbonColor = (stage: number, stageType: StageType): string => {
  if (stageType === STAGE.Review)
    return 'after:border-l-navy-darkest after:border-r-navy-darkest';
  // Tailwindはクライアントサイドでのランタイムを考慮しないため、クラス名は静的である必要がある。
  const colors: { [key: number]: string } = {
    1: 'after:border-l-stage-1-dark after:border-r-stage-2-dark',
    2: 'after:border-l-stage-2-dark after:border-r-stage-2-dark',
    3: 'after:border-l-stage-3-dark after:border-r-stage-3-dark',
    4: 'after:border-l-stage-4-dark after:border-r-stage-4-dark',
    5: 'after:border-l-stage-5-dark after:border-r-stage-5-dark',
    6: 'after:border-l-stage-6-dark after:border-r-stage-6-dark',
    7: 'after:border-l-stage-7-dark after:border-r-stage-7-dark',
    8: 'after:border-l-stage-8-dark after:border-r-stage-8-dark',
    9: 'after:border-l-stage-9-dark after:border-r-stage-9-dark',
    10: 'after:border-l-stage-10-dark after:border-r-stage-10-dark',
  };

  return colors[stage];
};

const StageDescription = ({ stageNumber, stageType }: Props) => {
  const displayStage = useCallback(
    (stageNumber: string) => {
      const stageName = stageType === STAGE.Normal ? 'ステージ' : 'スペシャル';

      return (
        <div
          className={`absolute h-[34px] left-2 top-0 w-14 px-3 text-center ${stageColorDark(
            parseInt(stageNumber),
            stageType,
          )} flex-col justify-center items-center z-10 after:absolute after:left-0 after:top-full after:h-0 after:w-0 ${ribbonColor(
            parseInt(stageNumber),
            stageType,
          )} after:border-l-28 after:border-r-28 after:border-b-8 after:border-b-transparent`}
        >
          <div className="flex flex-col justify-center items-center w-16 h-10 -ml-4 -mt-1">
            <div
              className={`${
                stageType === STAGE.Normal ? 'text-sm' : 'text-xs'
              } scale-75 mt-1`}
            >
              {stageName}
            </div>
            {stageType === STAGE.Normal ? (
              <div className="-mt-2 flex justify-center font-bold">
                {stageNumber}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      );
    },
    [stageType],
  );

  const displayDigitsRange = useCallback(
    (stageNumber: string) => {
      const [startDigit, endDigit] = rangeEnds(stageNumber, stageType);

      return (
        <div className="w-[214px] flex justify-center">
          小数第{startDigit}
          <span className="font-mono">~</span>
          {endDigit}位を覚えよう
        </div>
      );
    },
    [stageType],
  );

  return (
    <h1
      className={`flex items-center font-kosugi-maru border-[3px] border-white w-full ${stageColor(
        parseInt(stageNumber),
        stageType,
      )} rounded-lg relative h-12`}
    >
      {displayStage(stageNumber)}
      <span className="ml-14" />
      <div className="ml-2 flex justify-between items-center">
        {displayDigitsRange(stageNumber)}
        <div className="flex flex-col items-center">
          <p className="text-xs scale-75">もどる</p>
          <Link href="/">
            <a className="flex justify-center items-center -mt-1">
              <IconContext.Provider value={{ size: '30px' }}>
                <IoArrowBackCircle />
              </IconContext.Provider>
            </a>
          </Link>
        </div>
      </div>
    </h1>
  );
};

export default StageDescription;
