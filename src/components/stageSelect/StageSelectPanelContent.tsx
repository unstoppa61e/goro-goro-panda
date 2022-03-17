import StageSelectTile from './StageSelectTile';

type Props = {
  panelNumber: string;
  stage: number;
  isLocked: boolean;
};
const StageSelectPanelContent = ({ panelNumber, stage, isLocked }: Props) => {
  const tileNumbers = panelNumber.match(/.{2}/g)!;

  const stageIndicator = (
    <div className="w-16 mb-4 flex flex-col items-center">
      <p className="text-white text-xs scale-75">ステージ</p>
      <div className="h-9 w-9 flex justify-center items-center text-black text-2xl font-varela-round bg-white rounded-full">
        {stage}
      </div>
    </div>
  );

  const tiles = (
    <ul className="w-full flex justify-between ml-1">
      {tileNumbers.map((tileNumber: string, index: number) => (
        <li key={index}>
          <StageSelectTile
            tileNumber={tileNumber}
            isLocked={isLocked}
            firstTile={stage === 1 && index === 0}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="w-full flex items-center pl-2 pr-3">
      {stageIndicator}
      {tiles}
    </div>
  );
};

export default StageSelectPanelContent;
