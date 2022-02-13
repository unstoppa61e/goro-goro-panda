import { useRef, useState, useEffect, FormEvent } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';

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

type Props = {
  stageNumber: string;
};

type numberTileNumber = {
  value: string;
  id: number;
  isMistaken: boolean;
  isClosed: boolean;
  isFocused: boolean;
};

const Stage = ({ stageNumber }: Props) => {
  // const [score, setScore] = useState(8)
  const [numberTileNumbers, setNumberTileNumbers] = useState<
    numberTileNumber[]
  >([]);
  const stagePiNumber = (stageNumber: string) => {
    const piNumber =
      '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';
    const stagePiNumberLength = 10;
    const startIndex = stagePiNumberLength * (parseInt(stageNumber) - 1);

    return piNumber.substring(startIndex, startIndex + stagePiNumberLength);
  };

  const TargetTilesIndexes = () => {
    const level = 3;
    // この 5 はマジックナンバーなので、後ほど変更する
    const removeTimes = 5 - level;
    const indexes: number[] = Array.from({ length: 5 }, (_, i) => i);
    for (let i = 0; i < removeTimes; i++) {
      const arrayIndex = Math.floor(Math.random() * indexes.length);
      indexes.splice(arrayIndex, 1);
    }
    console.log(indexes);

    return indexes;
  };

  useEffect(() => {
    const initialNumbers: numberTileNumber[] = stagePiNumber(stageNumber)
      .split('')
      .map((number: string) => ({
        value: number,
        id: Math.random(),
        isMistaken: false,
        isClosed: false,
        isFocused: false,
      }));
    setNumberTileNumbers(initialNumbers);
  }, [stageNumber]);

  // const incrementScore = () => {
  //   setScore(prevScore => prevScore + 1)
  // }
  const score = 8;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClick = (): void => {
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
        <Wordplays numberTileNumbers={numberTileNumbers} />
        <Instruction />
        <Button handleOnClick={handleOnClick} />
        <button onClick={TargetTilesIndexes}>focusTiles</button>
      </div>
    </>
  );
};

export default Stage;
