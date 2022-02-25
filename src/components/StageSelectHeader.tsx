import Image from 'next/image';
import React from 'react';

function StageSelectHeader() {
  return (
    <header className="flex justify-between items-center w-72 mt-5">
      <div className="pointer-events-none">
        <Image
          src="/logo_transparent.png"
          alt="site logo"
          width={100}
          height={100}
          onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
          onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
        />
      </div>
      <h1 className="text-xl text-white font-kosugi-maru">
        ゲームと
        <br />
        ゴロ合わせで
        <br />
        円周率を覚えよう！
      </h1>
    </header>
  );
}

export default StageSelectHeader;
