import Image from 'next/image';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  clearedStageDefaultValue,
  clearedStageLocalStorageExists,
  useClearedStage,
} from '../hooks/useClearedStage';
import { GetStaticProps } from 'next';
import FacebookButton from '../components/sns/FacebookButton';
import TwitterButton from '../components/sns/TwitterButton';
import { Site } from '../lib/site';
import { NextSeo } from 'next-seo';
import { useBodyStyling } from '../hooks/useBodyStyling';
import {
  clearedReviewDefaultValue,
  clearedReviewLocalStorageExists,
  useClearedReview,
} from '../hooks/useClearedReview';

type Props = {
  clearedStageValues: string[];
  clearedReviewValues: string[];
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      clearedStageValues: '123456789abcdefghijklmnopqlstuvwxyz'.split(''),
      clearedReviewValues: '123456789abcdefghijklmnopqlstuvwxyz'.split(''),
    },
  };
};

const ThankYouForPlaying = ({
  clearedStageValues,
  clearedReviewValues,
}: Props) => {
  const clearedStage = useClearedStage(
    clearedStageDefaultValue,
    clearedStageValues,
  )[0];

  const clearedReview = useClearedReview(
    clearedReviewDefaultValue,
    clearedReviewValues,
  )[0];

  const router = useRouter();

  useEffect(() => {
    if (
      clearedStage === clearedStageDefaultValue &&
      clearedStageLocalStorageExists()
    )
      return;
    if (
      clearedReview === clearedReviewDefaultValue &&
      clearedReviewLocalStorageExists()
    )
      return;

    if (clearedStage < 10 || clearedReview < 1) {
      router.push('/').catch((e) => {
        console.log(e);
      });
    }
  }, [router, clearedStage, clearedReview]);

  const hyperColorSonora = [
    'bg-gradient-to-r',
    'from-yellow-200',
    'to-yellow-500',
  ];

  useBodyStyling(hyperColorSonora);

  const sentences = [
    'いっぱい遊んでくれて、ありがとう！',
    'ここまで来られたなんて、きみは本当に努力家だね。',
    'きみのがんばりが実を結んで、こんなに円周率を覚えられたんだ！',
    'きみはこれからもがんばって、前はできなかったことがどんどんできるようになっていくんだろうね。',
    'その姿を思い浮かべると、ワクワクしちゃうな…！',
    'きみがますます成長していくのを、楽しみにしているからね！',
    'ずっとおうえんしているよ！',
    'フレー、フレー、がんばりやさん！',
  ];

  const shareButtonText = `【${Site.title}】全ステージをクリアしました！`;
  const shareButtonSize = 50;

  const messageBody = sentences.map((sentence: string, index: number) => (
    <p className="mt-2" key={index}>
      {sentence}
    </p>
  ));

  return (
    <>
      <NextSeo
        title={Site.title}
        openGraph={{
          url: `${Site.origin}${router.asPath}`,
          title: Site.title,
          description: Site.description,
          images: [
            {
              url: `${Site.origin}/ogp${router.asPath}.png`,
              width: 1200,
              height: 630,
              alt: 'Og Image',
              type: 'image/png',
            },
          ],
          site_name: Site.title,
          type: 'website',
        }}
      />

      <div className="flex flex-col items-center font-kosugi-maru pb-8">
        <div className="text-black mt-6 mx-4 bg-white rounded-2xl py-5 relative before:absolute before:-bottom-5 before:mx-auto before:w-0 before:h-0 before:border-transparent before:left-0 before:right-0 before:border-10 before:border-t-10 before:border-t-white">
          <h1 className="flex justify-center items-center text-base mb-5 font-bold py-1">
            <span className="border-b-4 border-navy-lightest ">
              🎉 全ステージクリア おめでとう！ 🎉
            </span>
          </h1>
          <div className="text-base px-5">{messageBody}</div>
        </div>
        <div className="pointer-events-none mt-4 mb-3 mr-9">
          <Image
            src="/pandas/panda_happy_1.png"
            objectFit="contain"
            width={220}
            height={150}
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
          <a className="text-white relative flex items-center justify-center font-kosugi-maru rounded-full py-2.5 px-16 border-4 border-white shadow-lg shadow-black/25 sm:hover:border-gray-200 sm:hover:text-gray-200 active:border-gray-200 active:text-gray-200 bg-gradient-to-b from-navy-darker to-navy-lightest text-lg font-bold cursor-pointer mt-2">
            <span className="absolute top-1.5 w-48 h-5.5 bg-white opacity-30 rounded-full" />
            もっと遊ぶ
          </a>
        </Link>
        <div className="flex flex-col items-center">
          <div className="flex flex-col text-gray-500 mt-10">
            <p>全ステージクリア、おめでとう！</p>
            <p>今の気持ちとスペシャル画像を</p>
            <p>友達とシェアしよう！</p>
          </div>
          <div className="flex gap-x-6 mt-2">
            <FacebookButton text={shareButtonText} size={shareButtonSize} />
            <TwitterButton text={shareButtonText} size={shareButtonSize} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouForPlaying;
