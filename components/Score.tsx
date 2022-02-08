import Image from 'next/image';

type Props = {
  score: number;
};
const Progress = ({ score }: Props) => {
  const maxScore = 15;
  const srcPath = (index: number): string =>
    index < score ? '/star_yellow.png' : '/star_gray.png';
  const marks = [];
  for (let i = 0; i < maxScore; i++) {
    marks.push(
      <li>
        <Image src={srcPath(i)} alt="score" width={22} height={22} />
      </li>,
    );
  }

  return (
    <>
      <ul className="flex">{marks}</ul>
    </>
  );
};

export default Progress;
