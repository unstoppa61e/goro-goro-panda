import WordplayTile from './WordplayTile';
import { Mode, wordplayTile } from '../pages/stages/[stage]';

type Props = {
  mode: Mode;
  tiles: wordplayTile[];
};

const Wordplays = ({ mode, tiles }: Props) => {
  const wordplayTiles = tiles.map((tile, index) => {
    return (
      <li key={index}>
        <WordplayTile mode={mode} tile={tile} />
      </li>
    );
  });

  return <ul className="flex w-80 mt-1">{wordplayTiles}</ul>;
};

export default Wordplays;
