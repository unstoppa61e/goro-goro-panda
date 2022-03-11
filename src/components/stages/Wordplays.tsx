import WordplayTile from './WordplayTile';
import { Mode, wordplayTile } from '../../types';

type Props = {
  mode: Mode;
  tiles: wordplayTile[];
  stageNumber: string;
  typeModeCount: number;
};

const Wordplays = ({ mode, tiles, stageNumber, typeModeCount }: Props) => {
  const wordplayTiles = tiles.map((tile: wordplayTile, index: number) => {
    const currentStageNumber = (parseInt(stageNumber) + 2 * index).toString();

    return (
      <li key={index}>
        <WordplayTile
          mode={mode}
          tile={tile}
          stageNumber={currentStageNumber}
          typeModeCount={typeModeCount}
        />
      </li>
    );
  });

  return <ul className="flex w-full">{wordplayTiles}</ul>;
};

export default Wordplays;
