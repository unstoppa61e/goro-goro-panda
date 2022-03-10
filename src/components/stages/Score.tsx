import { maxScore } from '../../pages/stages/[stage]';
import Star from './Star';
import { useCallback } from 'react';

type Props = {
  score: number;
};
const Score = ({ score }: Props) => {
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

  return <ul className="flex">{marks}</ul>;
};

export default Score;
