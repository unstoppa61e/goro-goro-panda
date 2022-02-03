import Image from 'next/image'

const StageSelectHeader = () => {
  return (
    <header className="flex justify-between items-center w-72 mt-5">
      <Image src="/logo_transparent.png" alt="site logo" width={100} height={100} />
      <h1 className="text-xl text-white">
        ゲームと<br />ゴロ合わせで<br />円周率を覚えよう！
      </h1>
    </header>
  );
};

export default StageSelectHeader;
