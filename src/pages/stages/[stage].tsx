import { useState, useEffect, useCallback } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

import StageDescription from '../../components/stages/StageDescription';
import Score from '../../components/stages/Score';
import Wordplays from '../../components/stages/Wordplays';
import Instruction from '../../components/stages/Instruction';
import StartAnsweringButton from '../../components/stages/StartAnsweringButton';
import { piNumber } from '../index';
import {
  clearedStageDefaultValue,
  clearedStageLocalStorageExists,
  useClearedStage,
} from '../../hooks/useClearedStage';
import { useRouter } from 'next/router';
import Keyboard, { keyNumbers } from '../../components/stages/Keyboard';
import ReviewButton from '../../components/stages/ReviewButton';
import { Site } from '../../lib/site';
import {
  CONDITION,
  Condition,
  MODE,
  Mode,
  numberTileNumber,
  STAGE,
  wordplayTile,
} from '../../types';

const Modal = dynamic(() => import('../../components/stages/Modal'), {
  ssr: false,
});

interface Params extends ParsedUrlQuery {
  stage: string;
}

export const getStaticProps: GetStaticProps = (
  context: GetStaticPropsContext<
    ParsedUrlQuery,
    string | false | object | undefined
  >,
) => {
  const params = context.params as Params;
  const stageNumber = params.stage;

  return {
    props: {
      stageNumber,
      clearCountValues: process.env.CLEAR_COUNT!.split(','),
      clearedStageValues: process.env.CLEARED_STAGE!.split(','),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const stages: number[] = Array.from(
    { length: 10 },
    (_: unknown, i: number) => i + 1,
  );
  const paths = stages.map((stage: number) => ({
    params: { stage: stage.toString() },
  }));

  return { paths, fallback: false };
};

export const maxScore = 15;

const stagePiNumberLength = 10;
const wordplayNumberCount = 2;
const stageWordplayCount = stagePiNumberLength / wordplayNumberCount;

export const STAGE_CLEAR_COUNT_STORAGE_KEY_ROOT =
  'gorogoropanda.com/stageClearCount/';

type Props = {
  stageNumber: string;
  clearCountValues: string[];
  clearedStageValues: string[];
};

const defaultNumberState = {
  isClosed: false,
  isFocused: false,
  isCorrectLast: false,
};

const Stage = ({
  stageNumber,
  clearCountValues,
  clearedStageValues,
}: Props) => {
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState<Mode>(MODE.Remember);
  const [condition, setCondition] = useState<Condition>(CONDITION.Normal);
  const [wordplayTiles, setWordplayTiles] = useState<wordplayTile[]>([]);
  const [numberKeysMistaken, setNumberKeysMistaken] = useState<boolean[]>([]);
  const [level, setLevel] = useState(1);
  const [targetIndexesCombinations, setTargetIndexesCombinations] = useState<
    number[][]
  >([]);
  const [typeModeCount, setTypeModeCount] = useState(0);
  const [clearedStage, setClearedStage] = useClearedStage(
    clearedStageDefaultValue,
    clearedStageValues,
  );

  const stageType = STAGE.Normal;
  const router = useRouter();

  useEffect(() => {
    if (
      clearedStage === clearedStageDefaultValue &&
      clearedStageLocalStorageExists()
    )
      return;

    if (parseInt(stageNumber) > clearedStage + 1) {
      router.push('/').catch((e) => {
        console.log(e);
      });
    }
  }, [clearedStage, router, stageNumber]);

  const defaultNumberKeysState = new Array<boolean>(keyNumbers.length).fill(
    false,
  );

  const resetNumberKeys = useCallback(() => {
    setNumberKeysMistaken(defaultNumberKeysState);
  }, [defaultNumberKeysState]);

  useEffect(() => {
    resetNumberKeys();
  }, []);

  const initialWordplayTiles = useCallback(() => {
    const getStagePiNumber = () => {
      const startIndex = stagePiNumberLength * (parseInt(stageNumber) - 1);

      return piNumber.substring(startIndex, startIndex + stagePiNumberLength);
    };
    const piNumberChars = getStagePiNumber().split('');

    return Array.from(
      { length: stageWordplayCount },
      (_: unknown, index: number) => {
        const startIndex = wordplayNumberCount * index;
        const numbers = piNumberChars
          .slice(startIndex, startIndex + wordplayNumberCount)
          .map((number: string) => ({
            ...defaultNumberState,
            value: number,
          }));

        return {
          isTarget: false,
          isSolved: true,
          numbers: numbers,
        };
      },
    );
  }, [stageNumber]);

  const dynamicRoute = useRouter().asPath;

  useEffect(() => {
    setScore(0);
    setMode(MODE.Remember);
    setCondition(CONDITION.Normal);
    setWordplayTiles(initialWordplayTiles());
    setLevel(1);
    setTargetIndexesCombinations([]);
  }, [dynamicRoute, initialWordplayTiles]);

  useEffect(() => {
    if (mode !== MODE.Clear || typeof window === 'undefined') return;
    const currentStageNumber = parseInt(stageNumber);
    if (currentStageNumber > clearedStage) {
      setClearedStage(parseInt(stageNumber));
    }
    const clearCountStorageKey = `${STAGE_CLEAR_COUNT_STORAGE_KEY_ROOT}${stageNumber}`;
    const clearCount = localStorage.getItem(clearCountStorageKey);
    const incrementedClearCount =
      clearCount === null ? 1 : clearCountValues.indexOf(clearCount) + 1;
    localStorage.setItem(
      clearCountStorageKey,
      clearCountValues[incrementedClearCount],
    );
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

  const getTargetTilesIndexes = useCallback((): number[] => {
    const maxLevel = 5;
    const removeTimes = maxLevel - level;
    let indexes: number[];
    do {
      indexes = Array.from(
        { length: stageWordplayCount },
        (_: unknown, i: number) => i,
      );
      for (let i = 0; i < removeTimes; i++) {
        const arrayIndex = Math.floor(Math.random() * indexes.length);
        indexes.splice(arrayIndex, 1);
      }
      indexes.sort();
    } while (combinationAlreadyExists(indexes));
    setTargetIndexesCombinations(
      (prevTargetIndexesCombinations: number[][]) => [
        ...prevTargetIndexesCombinations,
        indexes,
      ],
    );

    return indexes;
  }, [combinationAlreadyExists, level]);

  const changeTargets = useCallback(() => {
    const targetTilesIndexes = getTargetTilesIndexes();
    setWordplayTiles((prevWordPlayTiles: wordplayTile[]) => {
      return prevWordPlayTiles.map(
        (wordplayTile: wordplayTile, index: number) => {
          if (targetTilesIndexes.includes(index)) {
            return { ...wordplayTile, isTarget: true };
          } else {
            return { ...wordplayTile, isTarget: false };
          }
        },
      );
    });
  }, [getTargetTilesIndexes]);

  const isLeveUpScore = (score: number): boolean => {
    const levelUpScores = [5, 8, 11, 14];

    return levelUpScores.includes(score);
  };

  useEffect(() => {
    if (isLeveUpScore(score)) {
      setLevel((prevLevel: number) => prevLevel + 1);
    } else if (score < maxScore) {
      changeTargets();
    } else {
      setMode(MODE.Clear);
    }
  }, [score]);

  useEffect(() => {
    if (level === 1) return;
    resetNumberKeys();
    setTargetIndexesCombinations([]);
    changeTargets();
    setCondition(CONDITION.LeveledUp);
  }, [level]);

  const setNotSolved = useCallback(() => {
    setWordplayTiles((prevWordplayTiles: wordplayTile[]) => {
      return prevWordplayTiles.map((wordplayTile: wordplayTile) => {
        if (wordplayTile.isTarget) {
          return { ...wordplayTile, isSolved: false };
        } else {
          return wordplayTile;
        }
      });
    });
  }, []);

  const setIsClosed = useCallback(() => {
    setWordplayTiles((prevWordPlayTiles: wordplayTile[]) => {
      return prevWordPlayTiles.map((wordplayTile: wordplayTile) => {
        if (wordplayTile.isTarget) {
          const numbers = wordplayTile.numbers.map(
            (number: numberTileNumber) => ({
              ...number,
              isClosed: true,
            }),
          );

          return { ...wordplayTile, numbers: numbers };
        } else {
          return wordplayTile;
        }
      });
    });
  }, []);

  const focusFirstTargetNumber = useCallback(() => {
    setWordplayTiles((prevWordPlayTiles: wordplayTile[]) => {
      let isDone = false;

      return prevWordPlayTiles.map((wordplayTile: wordplayTile) => {
        if (!wordplayTile.isTarget || isDone) {
          return wordplayTile;
        } else {
          const numbers = wordplayTile.numbers.map(
            (number: numberTileNumber, index: number) => {
              if (index === 0) {
                isDone = true;

                return { ...number, isFocused: true };
              } else {
                return number;
              }
            },
          );

          return { ...wordplayTile, numbers: numbers };
        }
      });
    });
  }, []);

  const resetIsCorrectLast = useCallback(() => {
    setWordplayTiles((prevWordplayTiles: wordplayTile[]) => {
      return prevWordplayTiles.map((wordplayTile: wordplayTile) => {
        const numbers = wordplayTile.numbers.map((number: numberTileNumber) => {
          return { ...number, isCorrectLast: false };
        });

        return { ...wordplayTile, numbers: numbers };
      });
    });
  }, []);

  const handleOnClick = useCallback((): void => {
    if (mode !== MODE.Remember) return;
    resetIsCorrectLast();
    setCondition(CONDITION.Normal);
    setMode(MODE.Type);
    setNotSolved();
    setIsClosed();
    setTypeModeCount((prevTypeModeCount: number) => prevTypeModeCount + 1);
    focusFirstTargetNumber();
  }, [focusFirstTargetNumber, mode, setIsClosed, setNotSolved]);

  const focusedNumber = useCallback((): string => {
    for (const wordplayTile of wordplayTiles) {
      for (const number of wordplayTile.numbers) {
        if (number.isFocused) return number.value;
      }
    }

    return '';
  }, [wordplayTiles]);

  const areAllSolved = useCallback((): boolean => {
    for (const wordplayTile of wordplayTiles) {
      if (!wordplayTile.isSolved) return false;
    }

    return true;
  }, [wordplayTiles]);

  useEffect(() => {
    if (
      condition === CONDITION.Failure ||
      mode !== MODE.Type ||
      !areAllSolved()
    )
      return;
    setMode(MODE.Remember);
    setScore((prevScore: number) => prevScore + 1);
    if (isLeveUpScore(score + 1)) return;
    setCondition(CONDITION.Normal);
    resetNumberKeys();
  }, [score, wordplayTiles]);

  const handleCorrectInput = useCallback(() => {
    setCondition(CONDITION.Success);
    resetIsCorrectLast();
    setWordplayTiles((prevWordplayTiles: wordplayTile[]) => {
      let foundFocused = false;

      return prevWordplayTiles.map((wordplayTile: wordplayTile) => {
        if (!wordplayTile.isTarget || wordplayTile.isSolved) {
          return wordplayTile;
        } else {
          let isSecond = false;
          const numbers = wordplayTile.numbers.map(
            (number: numberTileNumber, index: number) => {
              if (!number.isClosed) return number;
              if (number.isFocused) {
                foundFocused = true;
                if (index === 1) isSecond = true;

                return {
                  ...number,
                  ...defaultNumberState,
                  isCorrectLast: true,
                };
              } else if (foundFocused) {
                foundFocused = false;

                return { ...number, isFocused: true };
              } else {
                return number;
              }
            },
          );

          return { ...wordplayTile, isSolved: isSecond, numbers: numbers };
        }
      });
    });
    setNumberKeysMistaken(defaultNumberKeysState);
  }, [defaultNumberKeysState]);

  const handleWrongInput = useCallback((inputChar: string) => {
    setNumberKeysMistaken((prevNumberKeysMistaken: boolean[]) => {
      prevNumberKeysMistaken[parseInt(inputChar)] = true;

      return prevNumberKeysMistaken;
    });
    setCondition(CONDITION.Failure);
    setWordplayTiles((prevWordplayTiles: wordplayTile[]) => {
      return prevWordplayTiles.map((wordplayTile: wordplayTile) => {
        return wordplayTile;
      });
    });
  }, []);

  const handleReviewButtonClick = useCallback(() => {
    resetNumberKeys();
    setCondition(CONDITION.Normal);
    setMode(MODE.Remember);
    setWordplayTiles((prevWordplayTiles: wordplayTile[]) => {
      return prevWordplayTiles.map((wordplayTile: wordplayTile) => {
        if (!wordplayTile.isTarget) return wordplayTile;
        const numbers = wordplayTile.numbers.map((number: numberTileNumber) => {
          return { ...number, ...defaultNumberState };
        });

        return { ...wordplayTile, isSolved: true, numbers: numbers };
      });
    });
  }, [resetNumberKeys]);

  const isCorrectInput = useCallback(
    (input: string) => {
      const focused = focusedNumber();
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
    },
    [focusedNumber],
  );

  const handleInputNumber = useCallback(
    (inputChar: string) => {
      if (isCorrectInput(inputChar)) {
        handleCorrectInput();
      } else {
        handleWrongInput(inputChar);
      }
    },
    [handleCorrectInput, handleWrongInput, isCorrectInput],
  );

  const keyPress = useCallback(
    (event: KeyboardEvent) => {
      const code = event.code;
      const enter = 'Enter';
      const isEnter = code.slice(-enter.length) === enter;
      switch (mode) {
        case MODE.Remember: {
          if (!isEnter) break;
          handleOnClick();
          break;
        }
        case MODE.Type: {
          if (isEnter) {
            handleReviewButtonClick();
          } else {
            const inputChar = code[code.length - 1];
            if (isNaN(Number(inputChar))) break;
            handleInputNumber(inputChar);
          }
          break;
        }
        default:
          break;
      }
    },
    [handleInputNumber, handleOnClick, mode],
  );

  useEffect(() => {
    document.addEventListener('keypress', keyPress, false);

    return () => {
      document.removeEventListener('keypress', keyPress, false);
    };
  }, [keyPress]);

  const firstTargetNumber = useCallback((): string => {
    for (const tile of wordplayTiles) {
      if (tile.isTarget)
        return tile.numbers
          .map((number: numberTileNumber) => number.value)
          .join('');
    }

    return '';
  }, [wordplayTiles]);

  const typingModeTools = useCallback(() => {
    return (
      <div className="mt-5 flex flex-col">
        <div className="flex justify-center">
          <Keyboard
            handleInputNumber={handleInputNumber}
            mode={mode}
            numberKeysMistaken={numberKeysMistaken}
          />
        </div>
        <div className="mt-5 flex justify-center">
          <ReviewButton handleOnClick={handleReviewButtonClick} />
        </div>
      </div>
    );
  }, [handleInputNumber, handleReviewButtonClick, mode, numberKeysMistaken]);

  // const toggleModal = useCallback(() => {
  //   setMode((prevMode) => {
  //     if (prevMode === MODE.Clear) {
  //       return MODE.Remember;
  //     } else {
  //       return MODE.Clear;
  //     }
  //   });
  // }, []);

  return (
    <>
      <NextSeo
        title={`${Site.title} | ステージ${stageNumber}`}
        openGraph={{
          url: `${Site.origin}${router.asPath}`,
          title: `${Site.title} | ステージ${stageNumber}`,
          description: Site.description,
          images: [
            {
              url: `${Site.origin}/ogp${router.asPath}.png`,
              width: 1200,
              height: 630,
              alt: 'Og Image',
              type: 'image/png',
            },
          ],
          site_name: Site.title,
          type: 'website',
        }}
      />
      <Modal
        visible={mode === MODE.Clear}
        stageNumber={stageNumber}
        clearCountValues={clearCountValues}
        stageType={stageType}
      />
      <div className="flex justify-center">
        <div className="w-80 py-4 flex flex-col items-center text-white">
          <div className="w-full flex justify-center">
            <StageDescription stageNumber={stageNumber} stageType={stageType} />
          </div>
          <div className="mt-2 w-full flex justify-center">
            <Score score={score} maxScore={maxScore} />
          </div>
          <div className="mt-2 w-full flex justify-center">
            <Wordplays
              mode={mode}
              tiles={wordplayTiles}
              stageNumber={stageNumber}
              typeModeCount={typeModeCount}
            />
          </div>
          <div className="mt-5 w-full flex justify-center">
            <Instruction
              condition={condition}
              mode={mode}
              level={level}
              firstTargetNumber={firstTargetNumber()}
              stageType={stageType}
            />
          </div>
          {mode === MODE.Remember ? (
            <div className="mt-20 w-full flex justify-center">
              <StartAnsweringButton handleOnClick={handleOnClick} />
            </div>
          ) : (
            typingModeTools()
          )}
          {/*<button onClick={toggleModal} className="mt-8 border-2 p-2 text-xl">*/}
          {/*  toggle modal for debug*/}
          {/*</button>*/}
        </div>
      </div>
    </>
  );
};

export default Stage;
