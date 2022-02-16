import Image from 'next/image';
import Link from 'next/link';

import { stagePath } from './StageSelectPanel';

type Props = {
  visible: boolean;
  nextStageNumber: number;
};

const Modal = ({ visible, nextStageNumber }: Props) => {
  return (
    <div
      className={`flex justify-center fixed w-full h-full bg-black bg-opacity-40 duration-100 transition-all z-10 ${
        visible ? 'scale-110' : 'invisible'
      }`}
    >
      <div className="flex flex-col items-center absolute top-20 bg-white w-80 h-72 rounded-md">
        <div className="relative h-56">
          <Image
            src="/modal_frame.png"
            objectFit="contain"
            width={320}
            height={226}
            alt="frame"
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
          />
          <div className="flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <Image
              src="/pandas/panda_happy_1.png"
              objectFit="contain"
              width={70}
              height={100}
              alt="panda"
              onContextMenu={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
            />
            <div className="text-base w-48 ml-4">
              うわー！
              <br />
              こんなに
              <br />
              がんばれるなんて
              <br />
              すごいや！
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
