// import { useState } from 'react'
import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';

import StageDescription from '../../components/StageDescription';
import Score from '../../components/Score';

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

const Stage = ({ stageNumber }: Props) => {
  // const [score, setScore] = useState(8)
  const score = 8;

  return (
    <>
      <NextSeo title={`ゴロゴロ円周率 | ステージ${stageNumber}`} />
      <div className="flex flex-col items-center text-white">
        <StageDescription stageNumber={stageNumber} />
        <Score score={score} />
      </div>
    </>
  );
};

export default Stage;
