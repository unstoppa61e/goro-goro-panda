import type { NextPage } from 'next';

import StageSelectHeader from '../components/StageSelectHeader';
import StageSelectPanel from '../components/StageSelectPanel';

export const piNumber =
  '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

const Home: NextPage = () => {
  const panelNumbers = piNumber.match(/.{10}/g)!;

  return (
    <div>
      <main className="flex flex-col items-center">
        <StageSelectHeader />
        <ul className="flex flex-col items-center">
          {panelNumbers.map((panelNumber: string, index: number) => (
            <li key={index} className="flex justify-center items-center h-28">
              <StageSelectPanel panelNumber={panelNumber} stage={index + 1} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
