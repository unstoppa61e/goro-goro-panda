import Star from './Star';
import { useCallback } from 'react';

type Props = {
  score: number;
  maxScore: number;
};
const Score = ({ score, maxScore }: Props) => {
  const isBright = useCallback(
    (index: number) => {
      return index < score;
    },
    [score],
  );

  const marks = [];
  for (let i = 0; i < maxScore; i++) {
    marks.push(
      <li key={i}>
        <Star isBright={isBright(i)} />
      </li>,
    );
  }

  return <ul className="flex w-full justify-between">{marks}</ul>;
};

export default Score;
