import { useCallback } from 'react';
import Image from 'next/image';
import { CONDITION, Condition, MODE, Mode } from '../pages/stages/[stage]';

type Props = {
  condition: Condition;
  mode: Mode;
};

const Instruction = ({ condition, mode }: Props) => {
  const imgSrc = useCallback((condition: Condition) => {
    switch (condition) {
      case CONDITION.Normal:
        return '/pandas/panda_default.png';
      case CONDITION.Success:
        return '/pandas/panda_happy_2.png';
      case CONDITION.Failure:
        return '/pandas/panda_power.png';
    }
  }, []);

  const imageOnCondition = useCallback((condition: Condition) => {
    return (
      <Image
        src={imgSrc(condition)}
        objectFit="contain"
        width={75}
        height={88}
        alt="panda"
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
      />
    );
  }, []);

  const messageOnCondition = useCallback((condition: Condition) => {
    switch (condition) {
      case CONDITION.Success:
        return (
          <div className="flex items-center text-ok font-bold">
            <span className="text-2xl mr-1.5">○</span>いいね！ その調子だよ！
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
  }, []);

  const messageOnMode = useCallback((mode: Mode) => {
    switch (mode) {
      case MODE.Remember:
        return <div className="text-black">黄色の部分をおぼえよう！</div>;
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
  }, []);

  return (
    <div className="flex justify-between w-80 mt-3">
      {imageOnCondition(condition)}
      <div className="flex flex-col justify-center bg-white rounded-lg py-1 px-4 w-60">
        {messageOnCondition(condition)}
        {messageOnMode(mode)}
      </div>
    </div>
  );
};

export default Instruction;
