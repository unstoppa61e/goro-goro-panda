import Image from 'next/image';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useClearedStage } from '../hooks/useClearedStage';

const ThankYouForPlaying = () => {
  const clearedStage = useClearedStage('0')[0];
  const router = useRouter();

  useEffect(() => {
    if (parseInt(clearedStage) < 10) {
      router.push('/').catch((e) => {
        console.log(e);
      });
    }
  }, [router, clearedStage]);

  const sentences = [
    'いっぱい遊んでくれて、ありがとう！',
    'ここまで来られたなんて、きみは本当に努力家だね。',
    'きみのがんばりが実を結んで、こんなに円周率を覚えられたんだ！',
    'そんなきみが、他のことも同じようにがんばっていけたなら、きっと、色んなことがどんどんできるようになっていくんだろうね。',
    'その姿を思い浮かべると、ワクワクしちゃうな…！',
    'きみがますます成長していくのを、楽しみにしているからね！',
    'ずっとおうえんしているよ！',
    'フレー、フレー、がんばりやさん！',
  ];
  const messageBody = sentences.map((sentence: string, index: number) => (
    <p className="mt-2" key={index}>
      {sentence}
    </p>
  ));

  return (
    <div className="flex flex-col items-center font-kosugi-maru pb-8">
      <div className="text-black mt-6 mx-4 bg-white rounded-2xl px-6 py-5 relative before:absolute before:-bottom-5 before:mx-auto before:w-0 before:h-0 before:border-transparent before:left-0 before:right-0 before:border-10 before:border-t-10 before:border-t-white">
        <h1 className="flex justify-center text-base mb-5 font-bold">
          🎉{' '}
          <span className="border-b-4 border-ok py-1">
            全ステージクリア おめでとう！
          </span>{' '}
          🎉
        </h1>
        <div className="text-base px-1">{messageBody}</div>
      </div>
      <div className="pointer-events-none mt-6 mb-3 mr-9">
        <Image
          src="/pandas/panda_happy_1.png"
          objectFit="contain"
          width={320}
          height={226}
          alt="happy panda"
          onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
          onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
        />
      </div>
      <Link href="/">
        <a className="font-bold text-white w-28 py-3 cursor-pointer rounded bg-gray-300 sm:hover:bg-gray-500 active:bg-gray-500 text-center">
          もっと遊ぶ
        </a>
      </Link>
    </div>
  );
};

export default ThankYouForPlaying;
