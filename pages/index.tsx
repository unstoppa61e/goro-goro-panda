import type { NextPage } from 'next';

import StageSelectHeader from '../components/StageSelectHeader';
import StageSelectPanel from '../components/StageSelectPanel';

const Home: NextPage = () => {
  const piNumber =
    '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';
  const panelNumbers = piNumber.match(/.{10}/g)!;
  const isLocked = (index: number): boolean => {
    return index !== 0;
  };

  return (
    <div>
      <main className="flex flex-col items-center">
        <StageSelectHeader />
        <ul className="flex flex-col">
          {panelNumbers.map((panelNumber: string, index: number) => (
            <li key={index}>
              <StageSelectPanel
                panelNumber={panelNumber}
                stage={index + 1}
                isLocked={isLocked(index)}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
