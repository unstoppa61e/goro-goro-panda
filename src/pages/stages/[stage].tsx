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

export const MODE = {
  Remember: 'remember',
  Type: 'type',
} as const;

export type Mode = typeof MODE[keyof typeof MODE];

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
  const [mode, setMode] = useState<Mode>(MODE.Remember);
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
    setMode(MODE.Type);
    setNotSolved();
    setIsClosed();
    focusFirstTargetNumber();
    if (inputRef.current === null) return;
    inputRef.current.focus();
  };

  const focusedNumber = (): string => {
    for (const wordplayTile of wordplayTiles) {
      for (const number of wordplayTile.numbers) {
        if (number.isFocused) return number.value;
      }
    }

    return '';
  };

  const putDebug = (input: string, focused: string) => {
    const result = focused === input ? 'Same' : 'Different';
    console.log(`${result}(input: ${input}, focused: ${focused})`);
  };

  const handleCorrectInput = () => {
    setWordplayTiles((prevWordPlayTiles) => {
      let foundFocused = false;

      return prevWordPlayTiles.map((wordplayTile) => {
        if (!wordplayTile.isTarget || wordplayTile.isSolved) {
          return wordplayTile;
        } else {
          let isSecond = false;
          const numbers = wordplayTile.numbers.map((number, index) => {
            if (!number.isClosed) return number;
            if (number.isFocused) {
              foundFocused = true;
              if (index === 1) isSecond = true;

              return {
                ...number,
                isFocused: false,
                isMistaken: false,
                isClosed: false,
              };
            } else if (foundFocused) {
              foundFocused = false;

              return { ...number, isFocused: true };
            } else {
              return number;
            }
          });

          return { ...wordplayTile, isSolved: isSecond, numbers: numbers };
        }
      });
    });
  };

  const handleOnInput = (e: FormEvent<HTMLInputElement>): void => {
    const input = (e.target as HTMLInputElement).value;
    const focused = focusedNumber();
    putDebug(input, focused);
    if (input === focused) {
      handleCorrectInput();
    } else {
      // handleWrongInput()
      // isMistaken 付加
      // モード: Remember
    }
    (e.target as HTMLInputElement).value = '';
  };

  return (
    <>
      <NextSeo title={`ゴロゴロ円周率 | ステージ${stageNumber}`} />
      <div className="flex flex-col items-center text-white mt-1">
        <input ref={inputRef} className="w-0 h-0" onInput={handleOnInput} />
        <StageDescription stageNumber={stageNumber} />
        <Score score={score} />
        <Wordplays mode={mode} tiles={wordplayTiles} />
        <Instruction />
        {mode === MODE.Remember ? (
          <Button handleOnClick={handleOnClick} />
        ) : null}
      </div>
    </>
  );
};

export default Stage;
