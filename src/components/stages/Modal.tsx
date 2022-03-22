import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { stagePath } from '../stageSelect/StageSelectPanel';
import { STAGE_CLEAR_COUNT_STORAGE_KEY_ROOT } from '../../pages/stages/[stage]';
import TwitterButton from '../sns/TwitterButton';
import FacebookButton from '../sns/FacebookButton';
import { Site } from '../../lib/site';
import { STAGE, StageType } from '../../types';

type Props = {
  visible: boolean;
  stageNumber: string;
  clearCountValues: string[];
  stageType: StageType;
};

const Modal = memo(function Modal({
  visible,
  stageNumber,
  clearCountValues,
  stageType,
}: Props) {
  const [clearCount, setClearCount] = useState(0);

  useEffect(() => {
    const clearCountValue = localStorage.getItem(
      `${STAGE_CLEAR_COUNT_STORAGE_KEY_ROOT}${stageNumber}`,
    );
    setClearCount(
      clearCountValue === null ? 0 : clearCountValues.indexOf(clearCountValue),
    );
  }, [visible, stageNumber, clearCountValues]);

  const dice = useCallback((count: number): number => {
    return Math.floor(Math.random() * count);
  }, []);

  const frameSrc = useCallback(() => {
    const framesCount = 7;
    const frameNumber = dice(framesCount);

    return `/frames/modal_frame_${frameNumber}.png`;
  }, [dice]);

  const admirationHead = useCallback(() => {
    const messages = [
      'イエーイ！',
      'うわー！',
      'ハレルヤ！',
      'ブラボー！',
      'やったね！',
      'ワンダフォー！',
      'わーお！',
    ];

    return <p>{messages[dice(messages.length)]}</p>;
  }, [dice]);

  const admirationBody = useCallback(() => {
    const messages = [
      ['がんばっている', 'きみは', 'すてきだよ！'],
      ['がんばると', 'こんなことも', 'できるんだね！'],
      ['きみって', '努力家で', 'かっこいいなあ！'],
      ['きみは', 'がんばるのが', 'とくいなんだね！'],
      ['きみは', '努力家', 'なんだね！'],
      ['きみは', 'どんどん', '成長するね！'],
      ['きみは', 'どんどん', 'のびていくね！'],
      ['きみの', 'がんばりが', 'かがやいているね！'],
      ['きみの', 'がんばりに', 'はげまされるよ！'],
      ['こんなに', 'がんばれるなんて', 'すごいや！'],
      ['できることが', 'どんどん', '増えていくね！'],
      ['努力って', 'こんなに', 'すばらしいんだね！'],
    ];
    const message = messages[dice(messages.length)];

    return message.map((phrase: string, index: number) => (
      <p key={index}>{phrase}</p>
    ));
  }, [dice]);

  const messagePath = '/thank-you-for-playing';

  const frame = (
    <div className="pointer-events-none">
      <Image
        src={frameSrc()}
        objectFit="contain"
        width={320}
        height={226}
        alt="frame"
        onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
          e.preventDefault()
        }
        onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
          e.preventDefault()
        }
        className="rounded-t-md"
      />
    </div>
  );
  const pandaImage = (
    <div className="pointer-events-none">
      <Image
        src="/pandas/panda_happy_1.png"
        objectFit="contain"
        width={70}
        height={80}
        alt="panda"
        onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
          e.preventDefault()
        }
        onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
          e.preventDefault()
        }
      />
    </div>
  );

  const snsText = useCallback((): string => {
    const heading = `【${Site.title}】`;
    const stageName =
      stageType === STAGE.Normal ? 'ステージ' : 'スペシャルステージ';
    if (clearCount < 1) {
      return `${heading}${stageName}${
        stageType === STAGE.Normal ? stageNumber : ''
      }を初クリアしました！`;
    } else {
      return `${heading}${stageName}${
        stageType === STAGE.Normal ? stageNumber : ''
      }の習熟度が${clearCount + 1}にUPしました！`;
    }
  }, [clearCount, stageNumber, stageType]);

  const shareButtonSize = 40;

  const snsButtons = (
    <div className="flex justify-center gap-x-8 mt-2">
      <FacebookButton text={snsText()} size={shareButtonSize} />
      <TwitterButton text={snsText()} size={shareButtonSize} />
    </div>
  );
  const linkButtonClass =
    'relative text-sm w-44 py-2.5 cursor-pointer rounded-full text-white font-bold text-center border-4 border-white shadow-lg shadow-black/25';

  const buttonLight = (
    <span className="absolute top-1.5 left-3 w-36 h-4 bg-white opacity-30 rounded-full" />
  );

  const stageSelectButton = (
    <Link href="/">
      <a
        className={`${linkButtonClass} bg-gradient-to-b from-navy-darkest to-navy-darker sm:hover:bg-gray-500 active:bg-gray-500`}
        data-testid="move-to-stage-select-button"
      >
        {buttonLight}
        ステージをえらぶ
      </a>
    </Link>
  );

  const nextStagePath = useCallback(() => {
    if (stageType === STAGE.Review) return messagePath;
    if (parseInt(stageNumber) % 10 === 0)
      return `/reviews/${parseInt(stageNumber) / 10}`;

    return stagePath(parseInt(stageNumber) + 1);
  }, [stageNumber, stageType]);

  const moveToNextButton = (
    <Link href={nextStagePath()}>
      <a
        className={`${linkButtonClass} bg-gradient-to-b from-ok-dark to-ok-light sm:hover:bg-green-500 active:bg-green-500`}
        data-testid="move-to-next-stage-button"
      >
        {buttonLight}
        次に進む
      </a>
    </Link>
  );
  const linkButtons = (
    <div className="flex flex-col items-center gap-y-3">
      {stageSelectButton}
      {moveToNextButton}
    </div>
  );

  return (
    <div
      className={`flex justify-center fixed w-full h-full bg-black bg-opacity-40 z-20 font-kosugi-maru ${
        visible ? '' : 'invisible'
      }`}
      data-testid="modal"
    >
      <div
        className={`fixed inset-0 m-auto flex flex-col items-center bg-white w-80 h-[460px] rounded-md ${
          visible ? 'transition-all duration-200 scale-110' : 'scale-0'
        }`}
      >
        <div className="flex justify-center relative h-56">
          {frame}
          <div className="flex flex-col items-center absolute top-0 left-0 w-full">
            <h1 className="mt-12 mb-2 text-base font-bold">
              🎉 クリア おめでとう！ 🎉
            </h1>
            <div className="flex w-full ml-28">
              {pandaImage}
              <div className="text-sm w-48 ml-4">
                {admirationHead()}
                {admirationBody()}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-3 pb-4 flex flex-col w-full items-center">
          {linkButtons}
          <div className="flex flex-col text-xs mt-6">
            <div className="flex flex-col text-gray-500">
              <p>ステージクリア、おめでとう！</p>
              <p>今の気持ちを友達とシェアしよう！</p>
            </div>
            {snsButtons}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Modal;
