import type { NextPage } from 'next';

import StageSelectPanel from '../components/stageSelect/StageSelectPanel';
import Image from 'next/image';
import React from 'react';
import Footer from '../components/stageSelect/Footer';
import FacebookButton from '../components/sns/FacebookButton';
import TwitterButton from '../components/sns/TwitterButton';
import { GetStaticProps } from 'next';
import { Site } from '../lib/site';
import ReviewStagePanel from '../components/stageSelect/ReviewStagePanel';

export const piNumber =
  '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

type Props = {
  clearedStageValues: string[];
  clearedReviewValues: string[];
  clearCountValues: string[];
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      clearedStageValues: process.env.CLEARED_STAGE!.split(','),
      clearedReviewValues: process.env.CLEARED_REVIEW!.split(','),
      clearCountValues: process.env.CLEAR_COUNT!.split(','),
    },
  };
};

const Home: NextPage<Props> = ({
  clearedStageValues,
  clearedReviewValues,
  clearCountValues: clearCountValues,
}: Props) => {
  const panelNumbers = piNumber.match(/.{10}/g)!;

  const shareButtonText = `【${Site.title}】で語呂合わせのゲームをプレイ中！`;
  const shareButtonSize = 60;

  return (
    <div>
      <main className="flex justify-center">
        <div className="w-80 pt-4 pb-6 flex flex-col items-center">
          <div className="pointer-events-none">
            <Image
              src="/logo_4x.png"
              alt="site logo"
              width={320}
              height={230}
              objectFit="contain"
              onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
                e.preventDefault()
              }
              onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
                e.preventDefault()
              }
            />
          </div>
          <ul className="flex flex-col items-center">
            {panelNumbers.map((panelNumber: string, index: number) => (
              <li key={index} className="flex justify-center items-center h-28">
                <StageSelectPanel
                  panelNumber={panelNumber}
                  stage={index + 1}
                  clearedStageValues={clearedStageValues}
                  clearCountValues={clearCountValues}
                />
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center h-28">
            <ReviewStagePanel
              reviewNumber={1}
              clearedStageValues={clearedStageValues}
              clearedReviewValues={clearedReviewValues}
              clearCountValues={clearCountValues}
            />
          </div>
          <div className="mt-4 flex gap-x-8">
            <FacebookButton text={shareButtonText} size={shareButtonSize} />
            <TwitterButton text={shareButtonText} size={shareButtonSize} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
