import WordplayTile from './WordplayTile';
import { wordplayTile } from '../pages/stages/[stage]';

type Props = {
  tiles: wordplayTile[];
};

const Wordplays = ({ tiles }: Props) => {
  const wordplayTiles = tiles.map((tile, index) => {
    return (
      <li key={index}>
        <WordplayTile tile={tile} />
      </li>
    );
  });

  return <ul className="flex w-80 mt-1">{wordplayTiles}</ul>;
};

export default Wordplays;
