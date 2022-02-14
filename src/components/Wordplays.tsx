import WordplayTile from './WordplayTile';

type numberTileNumber = {
  value: string;
  id: number;
  isMistaken: boolean;
  isClosed: boolean;
  isFocused: boolean;
};

type tile = {
  isTarget: boolean;
};

type Props = {
  numberTileNumbers: numberTileNumber[];
  tiles: tile[];
};

const Wordplays = ({ numberTileNumbers, tiles }: Props) => {
  const tilePiNumbersSets = [];
  for (let i = 0; i < numberTileNumbers.length; i += 2) {
    tilePiNumbersSets.push(numberTileNumbers.slice(i, i + 2));
  }

  const wordplayTiles = tilePiNumbersSets.map((tilePiNumbers, index) => {
    return (
      <li key={index}>
        <WordplayTile tilePiNumbers={tilePiNumbers} tile={tiles[index]} />
      </li>
    );
  });

  return <ul className="flex w-80 mt-1">{wordplayTiles}</ul>;
};

export default Wordplays;
