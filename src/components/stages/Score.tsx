import Star from './Star';

type Props = {
  score: number;
  maxScore: number;
};
const Score = ({ maxScore }: Props) => {
  const marks = [];
  for (let i = 0; i < maxScore; i++) {
    marks.push(
      <li key={i}>
        <Star isBright={true} />
      </li>,
    );
  }

  return <ul className="flex w-full justify-between">{marks}</ul>;
};

export default Score;
