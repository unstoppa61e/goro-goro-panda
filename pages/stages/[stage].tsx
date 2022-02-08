import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';

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
  const circledNumber = (stageNumber: number): string => {
    const circledNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];

    return circledNumbers[stageNumber - 1];
  };
  const digitsRange = (stageNumber: number): string => {
    const startDigit: number = 10 * (stageNumber - 1) + 1;
    const endDigit = startDigit + 9;

    return `${startDigit}~${endDigit}`;
  };
  const stageDescription = (stageNumber: number): string => {
    return `ステージ${circledNumber(stageNumber)} 円周率の${digitsRange(
      stageNumber,
    )}ケタをおぼえよう`;
  };

  return (
    <>
      <NextSeo title={`ゴロゴロ円周率 | ステージ${stageNumber}`} />
      <h1>{stageDescription(parseInt(stageNumber))}</h1>
    </>
  );
};

export default Stage;
