import StageSelectTile from './StageSelectTile';

type Props = {
  panelNumber: string;
  stage: number;
  isLocked: boolean;
};
const StageSelectPanelContent = ({ panelNumber, stage, isLocked }: Props) => {
  const tileNumbers = panelNumber.match(/.{2}/g)!;

  return (
    <div className="w-full flex items-center px-2">
      <div className="w-16 flex flex-col items-center">
        <p className="text-white text-xs scale-75">ステージ</p>
        <div className="flex h-9 w-9 justify-center items-center text-black text-2xl font-varela-round bg-white rounded-full">
          {stage}
        </div>
      </div>
      <ul className="w-full flex justify-between">
        {tileNumbers.map((tileNumber: string, index: number) => (
          <li key={index}>
            <StageSelectTile tileNumber={tileNumber} isLocked={isLocked} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StageSelectPanelContent;
