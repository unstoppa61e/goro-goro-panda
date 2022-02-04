export const getStaticPaths = async () => {
  const paths = [];
  for (let i = 1; i < 10; i++) {
    paths.push({ params: { stage: i.toString() } });
  }
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const stage = context.params.stage;
  return {
    props: { stage },
  };
};

const Stage = ({ stage }) => {
  const circledNumber = (stageNumber: number): string => {
    const circledNumbers = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];
    return circledNumbers[stageNumber - 1];
  };
  const digitsRange = (stageNumber: number): string => {
    const startDigit: number = 10 * (stageNumber - 1) + 1;
    const endDigit = startDigit + 9;
    return `${startDigit}~${endDigit}`;
  };
  const stageDescription = (stageNumber: number): string => {
    return `ステージ${circledNumber(stageNumber)} 円周率の${digitsRange(
      stageNumber
    )}ケタをおぼえよう`;
  };
  return (
    <>
      <h1>{stageDescription(stage)}</h1>
    </>
  );
};

export default Stage;
