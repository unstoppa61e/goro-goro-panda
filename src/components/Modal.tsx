import Image from 'next/image';
import Link from 'next/link';

import { stagePath } from './StageSelectPanel';
import React from 'react';

type Props = {
  visible: boolean;
  nextStageNumber: number;
};

const Modal = ({ visible, nextStageNumber }: Props) => {
  const dice = (count: number): number => {
    return Math.floor(Math.random() * count);
  };

  const frameSrc = () => {
    const framesCount = 7;
    const frameNumber = dice(framesCount);

    return `/frames/modal_frame_${frameNumber}.png`;
  };

  const admirationHead = () => {
    const messages = [
      'イエーイ！',
      'うわー！',
      'ブラボー！',
      'やったね！',
      'ワンダフォー！',
      'わーお！',
    ];

    return <p>{messages[dice(messages.length)]}</p>;
  };

  const admirationBody = () => {
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
  };

  const lastStageNumber = 10;
  const messagePath = '/thank-you-for-playing';

  return (
    <div
      className={`flex justify-center fixed w-full h-full bg-black bg-opacity-40 z-10 font-kosugi-maru ${
        visible ? 'transition-all duration-100 scale-110' : 'invisible'
      }`}
    >
      <div className="flex flex-col items-center absolute top-36 bg-white w-80 h-72 rounded-md">
        <div className="flex justify-center relative h-56">
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
          <div className="flex flex-col items-center absolute top-0 left-0 w-full">
            <h1 className="mt-12 mb-2 text-base font-bold">
              🎉クリア、おめでとう！🎉
            </h1>
            <div className="flex w-full ml-28">
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
              <div className="text-sm w-48 ml-4">
                {admirationHead()}
                {admirationBody()}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex justify-evenly items-center text-white font-bold text-center">
          <Link href="/">
            <a className="w-36 py-2 cursor-pointer rounded bg-gray-300 sm:hover:bg-gray-500 active:bg-gray-500">
              ステージをえらぶ
            </a>
          </Link>
          <Link
            href={
              nextStageNumber <= lastStageNumber
                ? stagePath(nextStageNumber)
                : messagePath
            }
          >
            <a className="w-36 py-2 cursor-pointer rounded bg-green-400 sm:hover:bg-green-500 active:bg-green-500">
              次に進む
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
