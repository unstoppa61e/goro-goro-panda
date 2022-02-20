import { useRef, useState, useEffect, FormEvent, useCallback } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';

import StageDescription from '../../components/StageDescription';
import Score from '../../components/Score';
import Wordplays from '../../components/Wordplays';
import Instruction from '../../components/Instruction';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { piNumber } from '../index';
import { useClearedStage } from '../../hooks/useClearedStage';
import { useRouter } from 'next/router';

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
  Clear: 'clear',
} as const;
export type Mode = typeof MODE[keyof typeof MODE];

export const CONDITION = {
  Normal: 'normal',
  Success: 'success',
  Failure: 'failure',
  LeveledUp: 'leveled up',
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

export const maxScore = 15;

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
  const [targetIndexesCombinations, setTargetIndexesCombinations] = useState<
    number[][]
  >([]);
  const [clearedStage, setClearedStage] = useClearedStage(0);

  const getStagePiNumber = () => {
    const startIndex = stagePiNumberLength * (parseInt(stageNumber) - 1);

    return piNumber.substring(startIndex, startIndex + stagePiNumberLength);
  };

  const defaultNumberState = {
    isClosed: false,
    isFocused: false,
    isMistaken: false,
  };

  const initialWordplayTiles = useCallback(() => {
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
  }, [defaultNumberState, getStagePiNumber]);

  const dynamicRoute = useRouter().asPath;

  useEffect(() => {
    setScore(0);
    setMode(MODE.Remember);
    setCondition(CONDITION.Normal);
    setWordplayTiles(initialWordplayTiles());
    setLevel(1);
    setTargetIndexesCombinations([]);
  }, [dynamicRoute]);

  // useEffect(() => {
  //   setWordplayTiles(initialWordplayTiles());
  // }, []);

  useEffect(() => {
    if (mode !== MODE.Clear || typeof window === 'undefined') return;
    const currentStageNumber = parseInt(stageNumber);
    const clearedStageNumber = parseInt(clearedStage);
    if (currentStageNumber > clearedStageNumber) {
      setClearedStage(stageNumber);
    }
  }, [mode]);

  const arrayEqual = useCallback((a: number[], b: number[]) => {
    if (!Array.isArray(a)) return false;
    if (!Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }, []);

  const combinationAlreadyExists = useCallback(
    (indexes: number[]) => {
      for (const combination of targetIndexesCombinations) {
        if (arrayEqual(combination, indexes)) {
          return true;
        }
      }

      return false;
    },
    [arrayEqual, targetIndexesCombinations],
  );

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
      indexes.sort();
    } while (combinationAlreadyExists(indexes));
    setTargetIndexesCombinations((prevTargetIndexesCombinations) => [
      ...prevTargetIndexesCombinations,
      indexes,
    ]);

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
    } else if (score < maxScore) {
      changeTargets();
    } else {
      setMode(MODE.Clear);
    }
  }, [score]);

  useEffect(() => {
    if (level === 1) return;
    setTargetIndexesCombinations([]);
    changeTargets();
    setCondition(CONDITION.LeveledUp);
  }, [level]);

  const inputRef = useRef<HTMLInputElement>(null);

  const setNotSolved = useCallback(() => {
    setWordplayTiles((prevWordplayTiles) => {
      return prevWordplayTiles.map((wordplayTile) => {
        if (wordplayTile.isTarget) {
          return { ...wordplayTile, isSolved: false };
        } else {
          return wordplayTile;
        }
      });
    });
  }, []);

  const setIsClosed = useCallback(() => {
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
  }, []);

  const focusFirstTargetNumber = useCallback(() => {
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
  }, []);

  const handleOnClick = useCallback((): void => {
    if (inputRef.current === null) return;
    inputRef.current.focus();
    if (mode !== MODE.Remember) return;
    setCondition(CONDITION.Normal);
    setMode(MODE.Type);
    setNotSolved();
    setIsClosed();
    focusFirstTargetNumber();
  }, [mode]);

  const focusedNumber = (): string => {
    for (const wordplayTile of wordplayTiles) {
      for (const number of wordplayTile.numbers) {
        if (number.isFocused) return number.value;
      }
    }

    return '';
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
    setCondition(CONDITION.Normal);
    setMode(MODE.Remember);
    setScore((prevScore) => prevScore + 1);
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

  const isInputCorrect = (input: string, focused: string) => {
    const numberCombinations: { [key: string]: string[] } = {
      '0': ['0', '０'],
      '1': ['1', '１'],
      '2': ['2', '２'],
      '3': ['3', '３'],
      '4': ['4', '４'],
      '5': ['5', '５'],
      '6': ['6', '６'],
      '7': ['7', '７'],
      '8': ['8', '８'],
      '9': ['9', '９'],
    };

    return numberCombinations[focused].includes(input);
  };

  const handleOnInput = (e: FormEvent<HTMLInputElement>): void => {
    const inputStr = (e.target as HTMLInputElement).value;
    const inputChar = inputStr[inputStr.length - 1];
    const focusedChar = focusedNumber();
    if (isInputCorrect(inputChar, focusedChar)) {
      handleCorrectInput();
    } else {
      handleWrongInput();
    }
    (e.target as HTMLInputElement).value = '';
  };

  const keyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (mode) {
        case MODE.Remember:
          if (event.code !== 'Enter') break;
          handleOnClick();
          break;
        case MODE.Type:
          if (inputRef.current === null) break;
          inputRef.current.focus();
          break;
        default:
          break;
      }
    },
    [handleOnClick, mode],
  );

  useEffect(() => {
    document.addEventListener('keypress', keyPress, false);

    return () => {
      document.removeEventListener('keypress', keyPress, false);
    };
  }, [keyPress]);

  // const toggleModal = useCallback(() => {
  //   setMode((prevMode) => {
  //     if (prevMode === MODE.Clear) {
  //       return MODE.Remember;
  //     } else {
  //       return MODE.Clear;
  //     }
  //   });
  // }, []);

  const nextStageNumber = () => {
    return parseInt(stageNumber) + 1;
  };

  return (
    <>
      <NextSeo title={`ゴロゴロ円周率 | ステージ${stageNumber}`} />
      <Modal
        visible={mode === MODE.Clear}
        nextStageNumber={nextStageNumber()}
      />
      <div className="flex flex-col items-center text-white">
        <input
          ref={inputRef}
          className="w-0 h-0"
          onInput={handleOnInput}
          type="number"
        />
        <StageDescription stageNumber={stageNumber} />
        <Score score={score} />
        <Wordplays
          mode={mode}
          tiles={wordplayTiles}
          stageNumber={stageNumber}
        />
        <Instruction condition={condition} mode={mode} />
        <Button handleOnClick={handleOnClick} />
        {/*<button onClick={toggleModal} className="mt-8 border-2 p-2 text-xl">toggle modal for debug</button>*/}
      </div>
    </>
  );
};

export default Stage;
