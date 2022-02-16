import Image from 'next/image';

import { maxScore } from '../pages/stages/[stage]';

type Props = {
  score: number;
};
const Score = ({ score }: Props) => {
  const starYellow = (
    <Image src="/star_yellow.png" alt="yellow star" width={22} height={22} />
  );
  const starGray = (
    <Image src="/star_gray.png" alt="gray star" width={22} height={22} />
  );
  const star = (index: number) => (index < score ? starYellow : starGray);
  const marks = [];
  for (let i = 0; i < maxScore; i++) {
    marks.push(<li key={i}>{star(i)}</li>);
  }

  return (
    <div>
      <ul className="flex">{marks}</ul>
    </div>
  );
};

export default Score;
