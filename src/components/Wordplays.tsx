import WordplayTile from './WordplayTile';
import { Mode, wordplayTile } from '../pages/stages/[stage]';

type Props = {
  mode: Mode;
  tiles: wordplayTile[];
  stageNumber: string;
};

const Wordplays = ({ mode, tiles, stageNumber }: Props) => {
  const wordplayTiles = tiles.map((tile, index) => {
    return (
      <li key={index}>
        <WordplayTile mode={mode} tile={tile} stageNumber={stageNumber} />
      </li>
    );
  });

  return <ul className="mb-10 flex w-full">{wordplayTiles}</ul>;
};

export default Wordplays;
