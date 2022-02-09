import Image from 'next/image';

const Instruction = () => {
  return (
    <div className="flex justify-between w-80 mt-10">
      <Image
        src="/pandas/panda_default.png"
        objectFit="contain"
        width={75}
        height={75}
        alt="panda"
      />
      <div className="flex flex-col justify-center bg-white rounded-lg py-3 px-4">
        <div className="flex items-center text-ok font-bold">
          <span className="text-2xl mr-1.5">○</span>
          いいね！ その調子だよ！
        </div>
        <div className="text-black">
          黄色の四角に入る数字を
          <br />
          入力してね！
        </div>
      </div>
    </div>
  );
};

export default Instruction;
