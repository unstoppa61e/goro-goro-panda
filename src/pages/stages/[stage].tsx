import { useRef, useState, useEffect, FormEvent } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';

import { piNumber } from '../index';
import StageDescription from '../../components/StageDescription';
import Score from '../../components/Score';
import Wordplays from '../../components/Wordplays';
import Instruction from '../../components/Instruction';
import Button from '../../components/Button';

interface Params extends ParsedUrlQuery {
  stage: string;
}

export const getStaticProps: GetStaticProps = (context) => {
  const params = context.params as Params;
  const stageNumber = params.stage;

  return {
    props: { stageNumber },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const stages: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  const paths = stages.map((stage: number) => ({
    params: { stage: stage.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

const Mode = {
  Remember: 'remember',
  Type: 'type',
} as const;

export type Mode = typeof Mode[keyof typeof Mode];

type Props = {
  stageNumber: string;
};

export type numberTileNumber = {
  value: string;
  id: number;
  isMistaken: boolean;
  isClosed: boolean;
  isFocused: boolean;
};

export type wordplayTile = {
  isTarget: boolean;
  isSolved: boolean;
  numbers: numberTileNumber[];
};

const Stage = ({ stageNumber }: Props) => {
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState<Mode>(Mode.Remember);
  const stagePiNumberLength = 10;
  const wordplayNumberCount = 2;
  const stageWordplayCount = stagePiNumberLength / wordplayNumberCount;
  const getStagePiNumber = () => {
    const startIndex = stagePiNumberLength * (parseInt(stageNumber) - 1);

    return piNumber.substring(startIndex, startIndex + stagePiNumberLength);
  };
  const initialWordplayTiles = () => {
    const initialNumberState = {
      isMistaken: false,
      isClosed: false,
      isFocused: false,
    };
    const piNumberChars = getStagePiNumber().split('');

    return Array.from({ length: stageWordplayCount }, (_, index) => {
      const startIndex = wordplayNumberCount * index;
      const numbers = piNumberChars
        .slice(startIndex, startIndex + wordplayNumberCount)
        .map((number) => ({
          ...initialNumberState,
          value: number,
          id: Math.random(),
        }));

      return {
        isTarget: false,
        isSolved: true,
        numbers: numbers,
      };
    });
  };

  const [wordplayTiles, setWordplayTiles] = useState(initialWordplayTiles());

  const targetTilesIndexes = () => {
    const level = 3;
    // この 5 はマジックナンバーなので、後ほど変更する
    const removeTimes = 5 - level;
    const indexes: number[] = Array.from({ length: 5 }, (_, i) => i);
    for (let i = 0; i < removeTimes; i++) {
      const arrayIndex = Math.floor(Math.random() * indexes.length);
      indexes.splice(arrayIndex, 1);
    }

    return indexes;
  };

  const setTarget = () => {
    const targetIndexes = targetTilesIndexes();
    setWordplayTiles((prevWordPlayTiles) => {
      return prevWordPlayTiles.map((wordplayTile, index) => {
        if (targetIndexes.includes(index)) {
          return { ...wordplayTile, isTarget: true };
        } else {
          return { ...wordplayTile, isTarget: false };
        }
      });
    });
  };

  useEffect(() => {
    setTarget();
    // 後で消す
    setScore(0);
  }, []);

  // const incrementScore = () => {
  //   setScore(prevScore => prevScore + 1)
  // }

  const inputRef = useRef<HTMLInputElement>(null);

  const setNotSolved = () => {
    setWordplayTiles((prevWordPlayTiles) => {
      return prevWordPlayTiles.map((wordplayTile) => {
        if (wordplayTile.isTarget) {
          return { ...wordplayTile, isSolved: false };
        } else {
          return wordplayTile;
        }
      });
    });
  };

  const setIsClosed = () => {
    setWordplayTiles((prevWordPlayTiles) => {
      return prevWordPlayTiles.map((wordplayTile) => {
        if (wordplayTile.isTarget) {
          const numbers = wordplayTile.numbers.map((number) => ({
            ...number,
            isClosed: true,
          }));

          return { ...wordplayTile, numbers: numbers };
        } else {
          return wordplayTile;
        }
      });
    });
  };
  const focusFirstTargetNumber = () => {
    setWordplayTiles((prevWordPlayTiles) => {
      let isDone = false;

      return prevWordPlayTiles.map((wordplayTile) => {
        if (!isDone && wordplayTile.isTarget) {
          const numbers = wordplayTile.numbers.map((number, index) => {
            if (index === 0) {
              isDone = true;

              return { ...number, isFocused: true };
            } else {
              return number;
            }
          });

          return { ...wordplayTile, numbers: numbers };
        } else {
          return wordplayTile;
        }
      });
    });
  };
  const handleOnClick = (): void => {
    setMode(Mode.Type);
    setNotSolved();
    setIsClosed();
    focusFirstTargetNumber();
    if (inputRef.current === null) return;
    inputRef.current.focus();
  };

  const handleOnInput = (e: FormEvent<HTMLInputElement>) => {
    console.log((e.target as HTMLInputElement).value);
  };

  return (
    <>
      <NextSeo title={`ゴロゴロ円周率 | ステージ${stageNumber}`} />
      <div className="flex flex-col items-center text-white mt-1">
        <input ref={inputRef} className="w-0 h-0" onInput={handleOnInput} />
        <StageDescription stageNumber={stageNumber} />
        <Score score={score} />
        <Wordplays tiles={wordplayTiles} />
        <Instruction />
        {mode === Mode.Remember ? (
          <Button handleOnClick={handleOnClick} />
        ) : null}
      </div>
    </>
  );
};

export default Stage;
