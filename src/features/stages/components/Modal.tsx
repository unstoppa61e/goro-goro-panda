import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { stagePath } from '../../stageSelect/components/StageSelectPanel';
import { rangeEnds } from './StageDescription';
import { STORAGE_KEY_STAGE_CLEAR_COUNT_ROOT } from '../../../pages/stages/[stage]';
import TwitterButton from '../../sns/components/TwitterButton';
import FacebookButton from '../../sns/components/FacebookButton';
import { Site } from '../../../lib/site';

type Props = {
  visible: boolean;
  stageNumber: string;
  stageClearCountValues: string[];
};

const Modal = memo(function Modal({
  visible,
  stageNumber,
  stageClearCountValues,
}: Props) {
  const [stageClearedCount, setStageClearedCount] = useState(0);

  useEffect(() => {
    const stageClearCountValue = localStorage.getItem(
      `${STORAGE_KEY_STAGE_CLEAR_COUNT_ROOT}${stageNumber}`,
    );
    setStageClearedCount(
      stageClearCountValue === null
        ? 0
        : stageClearCountValues.indexOf(stageClearCountValue),
    );
  }, [visible, stageNumber, stageClearCountValues]);

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

  const lastStageNumber = 10;
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
    const [rangeStart, rangeEnd] = rangeEnds(stageNumber);
    if (stageClearedCount < 1) {
      return `【${Site.title}】小数第${rangeStart}~${rangeEnd}位のステージを初クリアしました！`;
    } else {
      return `【${
        Site.title
      }】小数第${rangeStart}~${rangeEnd}位のステージの習熟度が${
        stageClearedCount + 1
      }にUPしました！`;
    }
  }, [stageNumber, stageClearedCount]);

  const shareButtonSize = 40;

  const snsButtons = (
    <div className="flex flex-col gap-y-3">
      <FacebookButton text={snsText()} size={shareButtonSize} />
      <TwitterButton text={snsText()} size={shareButtonSize} />
    </div>
  );
  const linkButtonClass =
    'w-38 py-2 cursor-pointer rounded text-white font-bold text-center';
  const stageSelectButton = (
    <Link href="/">
      <a
        className={`${linkButtonClass} bg-gray-300 sm:hover:bg-gray-500 active:bg-gray-500`}
      >
        ステージをえらぶ
      </a>
    </Link>
  );
  const moveToNextButton = (
    <Link
      href={
        parseInt(stageNumber) < lastStageNumber
          ? stagePath(parseInt(stageNumber) + 1)
          : messagePath
      }
    >
      <a
        className={`${linkButtonClass} bg-green-400 sm:hover:bg-green-500 active:bg-green-500`}
      >
        次に進む
      </a>
    </Link>
  );
  const linkButtons = (
    <div className="flex flex-col gap-y-3">
      {stageSelectButton}
      {moveToNextButton}
    </div>
  );

  return (
    <div
      className={`flex justify-center fixed w-full h-full bg-black bg-opacity-40 z-20 font-kosugi-maru ${
        visible ? '' : 'invisible'
      }`}
    >
      <div
        className={`flex flex-col items-center absolute top-20 bg-white w-80 rounded-md ${
          visible ? 'transition-all duration-200 scale-110' : 'scale-0'
        }`}
      >
        <div className="flex justify-center relative h-56">
          {frame}
          <div className="flex flex-col items-center absolute top-0 left-0 w-full">
            <h1 className="mt-12 mb-2 text-base font-bold">
              🎉クリア、おめでとう！🎉
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
        <div className="mt-6 my-4 mr-2 flex gap-x-8">
          {snsButtons}
          {linkButtons}
        </div>
      </div>
    </div>
  );
});

export default Modal;
