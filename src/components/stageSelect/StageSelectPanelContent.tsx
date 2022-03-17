import StageSelectTile from './StageSelectTile';
import { STAGE } from '../../types';
import ClearCount from './ClearCount';

type Props = {
  panelNumber: string;
  stage: number;
  isLocked: boolean;
  clearCountValues: string[];
};
const StageSelectPanelContent = ({
  panelNumber,
  stage,
  isLocked,
  clearCountValues,
}: Props) => {
  const tileNumbers = panelNumber.match(/.{2}/g)!;

  const circleColor = isLocked
    ? 'bg-locked-dark'
    : {
        1: 'bg-stage-1-dark',
        2: 'bg-stage-2-dark',
        3: 'bg-stage-3-dark',
        4: 'bg-stage-4-dark',
        5: 'bg-stage-5-dark',
        6: 'bg-stage-6-dark',
        7: 'bg-stage-7-dark',
        8: 'bg-stage-8-dark',
        9: 'bg-stage-9-dark',
        10: 'bg-stage-10-dark',
      }[stage];

  const stageIndicator = (
    <div className="flex items-center gap-x-1 text-white">
      <p className="text-sm font-mono font-bold">ステージ</p>
      <div
        className={`h-6 w-6 flex justify-center items-center text-sm font-varela-round ${
          circleColor ? circleColor : ''
        } bg-opacity-70 rounded-full`}
      >
        {stage}
      </div>
    </div>
  );

  const tiles = (
    <ul className="w-full flex justify-between px-4">
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
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center ml-3.5 mr-2.5">
        {stageIndicator}
        <ClearCount
          stage={stage}
          clearCountValues={clearCountValues}
          stageType={STAGE.Normal}
        />
      </div>
      <hr className="border-dashed mt-1 mb-2" />
      {tiles}
    </div>
  );
};

export default StageSelectPanelContent;
