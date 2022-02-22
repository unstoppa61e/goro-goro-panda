import Image from 'next/image';
import Link from 'next/link';

import { stagePath } from './StageSelectPanel';

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

    return message.map((phrase, index) => <p key={index}>{phrase}</p>);
  };

  return (
    <div
      className={`flex justify-center fixed w-full h-full bg-black bg-opacity-40 duration-100 transition-all z-10 font-kosugi-maru ${
        visible ? 'scale-110' : 'invisible'
      }`}
    >
      <div className="flex flex-col items-center absolute top-20 bg-white w-80 h-72 rounded-md">
        <div className="relative h-56">
          <Image
            src={frameSrc()}
            objectFit="contain"
            width={320}
            height={226}
            alt="frame"
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
          />
          <div className="flex flex-col absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <h1 className="text-base text-center font-bold">
              🎉クリア、おめでとう！🎉
            </h1>
            <div className="flex mt-2">
              <Image
                src="/pandas/panda_happy_1.png"
                objectFit="contain"
                width={90}
                height={100}
                alt="panda"
                onContextMenu={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
              />
              <div className="text-sm w-48 ml-4">
                {admirationHead()}
                {admirationBody()}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex justify-evenly items-center text-white font-bold text-center">
          <Link href="/">
            <a className="w-36 py-2 cursor-pointer rounded bg-gray-300 hover:bg-gray-500">
              ステージをえらぶ
            </a>
          </Link>
          <Link href={stagePath(nextStageNumber)}>
            <a className="w-36 py-2 cursor-pointer rounded bg-green-400 hover:bg-green-500">
              次に進む
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
