import StageSelectTile from "./StageSelectTile";

type Props = {
  panelNumber: string;
  stage: number;
  isLocked: boolean;
};
const StageSelectPanelContent = ({ panelNumber, stage, isLocked }: Props) => {
  const tileNumbers = panelNumber.match(/.{2}/g)!;
  return (
    <>
      <div className="text-white text-xl mt-7 ml-7">{stage}</div>
      <ul className="flex">
        {tileNumbers.map((tileNumber: string, index: number) => (
          <li key={index}>
            <StageSelectTile tileNumber={tileNumber} isLocked={isLocked} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default StageSelectPanelContent;
