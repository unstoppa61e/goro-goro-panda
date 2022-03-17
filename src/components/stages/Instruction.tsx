import React, { useCallback } from 'react';
import Image from 'next/image';
import {
  CONDITION,
  Condition,
  MODE,
  Mode,
  STAGE,
  StageType,
} from '../../types';
import { rangeEnds } from '../../lib/rangeEnds';

type Props = {
  condition: Condition;
  mode: Mode;
  level: number;
  firstTargetNumber: string;
  stageType: StageType;
  score: number;
};

const wordplays: { [key: string]: { word: string; applicableLength: number } } =
  {
    '03': { word: '王さま', applicableLength: 2 },
    '06': { word: 'おむつ', applicableLength: 2 },
    '07': { word: 'おなら', applicableLength: 2 },
    '08': { word: 'おばあさん', applicableLength: 2 },
    '10': { word: 'じゅう', applicableLength: 3 },
    '14': { word: 'ひよこ', applicableLength: 2 },
    '15': { word: 'いちご', applicableLength: 3 },
    '17': { word: 'いなり寿司', applicableLength: 2 },
    '19': { word: 'いくら', applicableLength: 2 },
    '20': { word: 'プレゼント', applicableLength: 2 },
    '21': { word: 'ブイサイン', applicableLength: 2 },
    '23': { word: '踏み切り', applicableLength: 2 },
    '25': { word: 'ニコニコ', applicableLength: 2 },
    '26': { word: '風呂', applicableLength: 2 },
    '28': { word: 'つばさ', applicableLength: 2 },
    '32': { word: 'みつばち', applicableLength: 2 },
    '34': { word: 'ミシン', applicableLength: 2 },
    '35': { word: 'サンゴ', applicableLength: 3 },
    '38': { word: 'サンバ', applicableLength: 3 },
    '39': { word: 'さくらんぼ', applicableLength: 2 },
    '43': { word: 'シーサー', applicableLength: 4 },
    '44': { word: 'ヨーヨー', applicableLength: 4 },
    '46': { word: 'シール', applicableLength: 3 },
    '48': { word: 'しんぱん', applicableLength: 4 },
    '49': { word: 'フォーク', applicableLength: 4 },
    '50': { word: 'こま', applicableLength: 2 },
    '58': { word: 'ゴーヤ', applicableLength: 3 },
    '59': { word: 'コック', applicableLength: 3 },
    '62': { word: 'ロープウェイ', applicableLength: 3 },
    '64': { word: '虫めがね', applicableLength: 1 },
    '65': { word: 'ラッコ', applicableLength: 3 },
    '69': { word: 'ロッククライミング', applicableLength: 3 },
    '71': { word: 'ナイフ', applicableLength: 2 },
    '75': { word: '七五三', applicableLength: 2 },
    '79': { word: '泣く', applicableLength: 2 },
    '81': { word: 'パイナップル', applicableLength: 2 },
    '84': { word: 'はしご', applicableLength: 2 },
    '86': { word: 'ハムスター', applicableLength: 2 },
    '89': { word: '野球', applicableLength: 2 },
    '92': { word: 'くじら', applicableLength: 2 },
    '93': { word: '草', applicableLength: 1 },
    '97': { word: 'くない', applicableLength: 2 },
    '99': { word: '救急車', applicableLength: 2 },
  };

const Instruction = ({
  condition,
  mode,
  level,
  firstTargetNumber,
  stageType,
  score,
}: Props) => {
  const imgSrc = useCallback((condition: Condition): string => {
    switch (condition) {
      case CONDITION.Normal:
        return '/pandas/panda_default.png';
      case CONDITION.Success:
        return '/pandas/panda_happy_2.png';
      case CONDITION.LeveledUp:
        return '/pandas/panda_happy_2.png';
      case CONDITION.Failure:
        return '/pandas/panda_power.png';
      default:
        return '/pandas/panda_default.png';
    }
  }, []);

  let shadowLeft;
  switch (condition) {
    case CONDITION.Normal:
      shadowLeft = 'left-[17px]';
      break;
    case CONDITION.Success:
      shadowLeft = 'left-[16px]';
      break;
    case CONDITION.Failure:
      shadowLeft = 'left-[15px]';
      break;
    case CONDITION.LeveledUp:
      shadowLeft = 'left-[16px]';
      break;
    default:
      shadowLeft = 'left-0';
  }

  const shadow = (
    <span
      className={`absolute bottom-0.5 ${shadowLeft} w-11 h-3.5 bg-black opacity-15 rounded-50%`}
    />
  );

  const imageOnCondition = useCallback(() => {
    return (
      <div className="pointer-events-none w-20 z-10 relative">
        <Image
          src={imgSrc(condition)}
          objectFit="contain"
          width={75}
          height={88}
          alt="panda"
          onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
          onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
        />
        {shadow}
      </div>
    );
  }, [condition, imgSrc]);

  const messageOnCondition = useCallback(() => {
    switch (condition) {
      case CONDITION.Success:
        return (
          <div className="flex items-center text-ok font-bold">
            <span className="text-xl mr-0.5">○</span>
            <p>
              いいね！
              <span className="mr-0.5" />
              その調子だよ！
            </p>
          </div>
        );
      case CONDITION.LeveledUp:
        return (
          <div className="flex items-center text-ok font-bold">
            <span className="text-xl mr-2">🎉</span>レベルアップ！
          </div>
        );
      case CONDITION.Failure:
        return (
          <div className="flex items-center text-ng font-bold">
            <span className="text-xl mr-2">❌</span>失敗は成功のもと！
          </div>
        );
      default:
        break;
    }
  }, [condition]);

  const messageOnMode = useCallback(() => {
    if (!firstTargetNumber) return null;

    const wordplayMessage = () => {
      const targetWordplay = wordplays[firstTargetNumber];
      const underlined = targetWordplay['word'].slice(
        0,
        targetWordplay['applicableLength'],
      );
      const raw = targetWordplay['word'].slice(
        targetWordplay['applicableLength'],
      );

      return (
        <p className="text-black">
          「
          <span className="font-bold">
            <span className="border-b-6 border-focused">{underlined}</span>
            {raw}
          </span>
          」を覚えよう！
        </p>
      );
    };

    const rememberModeMessage = () => {
      if (stageType === STAGE.Review) {
        const [start, end] = rangeEnds((score + 1).toString(), STAGE.Normal);

        return (
          <p className="text-black">
            小数第{start}〜{end}位を
            <br />
            覚えよう！
          </p>
        );
      }
      if (level > 1)
        return <p className="text-black">黄色の部分を覚えよう！</p>;

      return wordplayMessage();
    };

    switch (mode) {
      case MODE.Remember:
        return rememberModeMessage();
      case MODE.Type:
        return (
          <div className="text-black">
            黄色の四角に入る数字を
            <br />
            入力してね！
          </div>
        );
      default:
        break;
    }
  }, [level, mode, firstTargetNumber, score, stageType]);

  return (
    <div className="flex justify-between w-full">
      {imageOnCondition()}
      <div className="flex flex-col justify-center items-center bg-white rounded-lg px-2 w-58 mr-1 font-kosugi-maru relative before:absolute before:-left-4 before:top-7 before:border-8 before:border-transparent before:border-r-8 before:border-r-white">
        <div>
          {messageOnCondition()}
          {messageOnMode()}
        </div>
      </div>
    </div>
  );
};

Instruction.defaultProps = {
  score: 0,
};

export default Instruction;
