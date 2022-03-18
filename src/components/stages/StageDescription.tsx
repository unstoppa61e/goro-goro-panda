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

const StageDescription = ({ stageNumber, stageType }: Props) => {
  const displayStage = useCallback(
    (stageNumber: string) => {
      const stageName = stageType === STAGE.Normal ? 'ステージ' : 'スペシャル';

      return (
        <div className="absolute h-9 left-2 top-0 w-14 px-3 text-center bg-ribbon flex-col justify-center items-center z-10 after:absolute after:left-0 after:top-full after:h-0 after:w-0 after:border-l-ribbon after:border-r-ribbon after:border-l-28 after:border-r-28 after:border-b-8 after:border-b-transparent ">
          <div className="flex flex-col justify-center items-center w-16 h-10 -ml-4">
            <div
              className={`${
                stageType === STAGE.Normal ? 'text-sm' : 'text-xs'
              } scale-75`}
            >
              {stageName}
            </div>
            {stageType === STAGE.Normal ? (
              <div className="-mt-1.5 flex justify-center font-bold">
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
        <div className="w-[216px] flex justify-center">
          小数第{startDigit}
          <span className="font-mono">~</span>
          {endDigit}位を覚えよう
        </div>
      );
    },
    [stageType],
  );

  return (
    <h1 className="flex items-center font-kosugi-maru border-2 w-full bg-description rounded-lg border-white relative h-12">
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
