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

  return { props: { stageNumber } };
};

export const getStaticPaths: GetStaticPaths = () => {
  const stages: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  const paths = stages.map((stage: number) => ({
    params: { stage: stage.toString() },
  }));

  return { paths, fallback: false };
};

export const MODE = {
  Remember: 'remember',
  Type: 'type',
} as const;
export type Mode = typeof MODE[keyof typeof MODE];

export const CONDITION = {
  Normal: 'normal',
  Success: 'success',
  Failure: 'failure',
} as const;
export type Condition = typeof CONDITION[keyof typeof CONDITION];

export type numberTileNumber = {
  value: string;
  isClosed: boolean;
  isFocused: boolean;
  isMistaken: boolean;
};

export type wordplayTile = {
  isTarget: boolean;
  isSolved: boolean;
  numbers: numberTileNumber[];
};

const stagePiNumberLength = 10;
const wordplayNumberCount = 2;
const stageWordplayCount = stagePiNumberLength / wordplayNumberCount;

type Props = {
  stageNumber: string;
};

const Stage = ({ stageNumber }: Props) => {
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState<Mode>(MODE.Remember);
  const [condition, setCondition] = useState<Condition>(CONDITION.Normal);
  const [wordplayTiles, setWordplayTiles] = useState<wordplayTile[]>([]);
  const [level, setLevel] = useState(1);
  const [targetIndexes, setTargetIndexes] = useState<number[]>([]);

  const getStagePiNumber = () => {
    const startIndex = stagePiNumberLength * (parseInt(stageNumber) - 1);

    return piNumber.substring(startIndex, startIndex + stagePiNumberLength);
  };

  const defaultNumberState = {
    isClosed: false,
    isFocused: false,
    isMistaken: false,
  };

  const initialWordplayTiles = () => {
    const piNumberChars = getStagePiNumber().split('');

    return Array.from({ length: stageWordplayCount }, (_, index) => {
      const startIndex = wordplayNumberCount * index;
      const numbers = piNumberChars
        .slice(startIndex, startIndex + wordplayNumberCount)
        .map((number) => ({
          ...defaultNumberState,
          value: number,
        }));

      return {
        isTarget: false,
        isSolved: true,
        numbers: numbers,
      };
    });
  };

  useEffect(() => {
    setWordplayTiles(initialWordplayTiles());
  }, []);

  const arrayEqual = (a: number[], b: number[]) => {
    if (!Array.isArray(a)) return false;
    if (!Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  };

  const getTargetTilesIndexes = (): number[] => {
    const maxLevel = 5;
    const removeTimes = maxLevel - level;
    let indexes: number[];
    do {
      indexes = Array.from({ length: stageWordplayCount }, (_, i) => i);
      for (let i = 0; i < removeTimes; i++) {
        const arrayIndex = Math.floor(Math.random() * indexes.length);
        indexes.splice(arrayIndex, 1);
      }
    } while (arrayEqual(indexes, targetIndexes));
    setTargetIndexes(indexes);

    return indexes;
  };

  const changeTargets = () => {
    const targetTilesIndexes = getTargetTilesIndexes();
    setWordplayTiles((prevWordPlayTiles) => {
      return prevWordPlayTiles.map((wordplayTile, index) => {
        if (targetTilesIndexes.includes(index)) {
          return { ...wordplayTile, isTarget: true };
        } else {
          return { ...wordplayTile, isTarget: false };
        }
      });
    });
  };

  useEffect(() => {
    if (score === 5 || score === 8 || score === 11 || score === 14) {
      setLevel((prevLevel) => prevLevel + 1);
    } else {
      changeTargets();
    }
  }, [score]);

  useEffect(() => {
    changeTargets();
  }, [level]);

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
        if (!wordplayTile.isTarget || isDone) {
          return wordplayTile;
        } else {
          const numbers = wordplayTile.numbers.map((number, index) => {
            if (index === 0) {
              isDone = true;

              return { ...number, isFocused: true };
            } else {
              return number;
            }
          });

          return { ...wordplayTile, numbers: numbers };
        }
      });
    });
  };

  const handleOnClick = (): void => {
    setCondition(CONDITION.Normal);
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

  const areAllSolved = (): boolean => {
    for (const wordplayTile of wordplayTiles) {
      if (!wordplayTile.isSolved) return false;
    }

    return true;
  };

  useEffect(() => {
    if (
      condition === CONDITION.Failure ||
      mode !== MODE.Type ||
      !areAllSolved() ||
      inputRef.current === null
    )
      return;
    inputRef.current.blur();
    setMode(MODE.Remember);
    setScore((prevScore) => prevScore + 1);
    console.log(`score: ${score}`);
  }, [wordplayTiles]);

  const handleCorrectInput = () => {
    setCondition(CONDITION.Success);
    setWordplayTiles((prevWordplayTiles) => {
      let foundFocused = false;

      return prevWordplayTiles.map((wordplayTile) => {
        if (!wordplayTile.isTarget || wordplayTile.isSolved) {
          return wordplayTile;
        } else {
          let isSecond = false;
          const numbers = wordplayTile.numbers.map((number, index) => {
            if (!number.isClosed) return number;
            if (number.isFocused) {
              foundFocused = true;
              if (index === 1) isSecond = true;

              return { ...number, ...defaultNumberState };
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

  const handleWrongInput = () => {
    setCondition(CONDITION.Failure);
    setMode(MODE.Remember);
    setWordplayTiles((prevWordplayTiles) => {
      return prevWordplayTiles.map((wordplayTile) => {
        if (!wordplayTile.isTarget) return wordplayTile;
        const numbers = wordplayTile.numbers.map((number) => {
          if (number.isFocused) {
            return { ...number, ...defaultNumberState, isMistaken: true };
          } else {
            return { ...number, ...defaultNumberState };
          }
        });

        return { ...wordplayTile, isSolved: true, numbers: numbers };
      });
    });
    if (inputRef.current === null) return;
    inputRef.current.blur();
  };

  const handleOnInput = (e: FormEvent<HTMLInputElement>): void => {
    const input = (e.target as HTMLInputElement).value;
    const focused = focusedNumber();
    putDebug(input, focused);
    if (input === focused) {
      handleCorrectInput();
    } else {
      handleWrongInput();
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
