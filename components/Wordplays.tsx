import WordplayTile from './WordplayTile';

type Props = {
  wordplayPiNumbers: string[];
};

const Wordplays = ({ wordplayPiNumbers }: Props) => {
  const wordplayTiles = wordplayPiNumbers.map((wordplayPiNumber, index) => {
    return (
      <li key={index}>
        <WordplayTile tilePiNumber={wordplayPiNumber} />
      </li>
    );
  });

  return <ul className="flex w-80 mt-4">{wordplayTiles}</ul>;
};

export default Wordplays;
