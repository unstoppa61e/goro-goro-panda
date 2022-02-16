import Image from 'next/image';

const Instruction = () => {
  return (
    <div className="flex justify-between w-80 mt-3">
      <Image
        src="/pandas/panda_default.png"
        objectFit="contain"
        width={75}
        height={88}
        alt="panda"
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
      />
      <div className="flex flex-col justify-center bg-white rounded-lg py-1 px-4 w-60">
        {/*<div className="flex items-center text-ok font-bold">*/}
        {/*  <span className="text-2xl mr-1.5">○</span>*/}
        {/*  いいね！ その調子だよ！*/}
        {/*</div>*/}
        {/*<div className="text-black">*/}
        {/*  黄色の四角に入る数字を*/}
        {/*  <br />*/}
        {/*  入力してね！*/}
        {/*</div>*/}
        <div className="text-black">黄色の部分をおぼえよう！</div>
      </div>
    </div>
  );
};

export default Instruction;
