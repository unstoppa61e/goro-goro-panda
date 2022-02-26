import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/').catch((e) => {
        console.log(e);
      });
    }, 5000);
  }, [router]);

  return (
    <div className="flex flex-col items-center text-white text-4xl font-varela-round mt-8">
      <h1>404 NOT FOUND</h1>
      <div className="mt-6 pointer-events-none">
        <Image
          src="/pandas/panda_worried.png"
          objectFit="contain"
          width={251}
          height={289}
          alt="worried panda"
          onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
          onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
        />
      </div>

      <div className="text-xl font-kosugi-maru mt-6">
        <p>このページはありません。</p>
        <p>
          ５秒後に
          <Link href="/">
            <a>ステージ選択</a>
          </Link>
          画面に戻ります。
        </p>
      </div>
    </div>
  );
};

export default NotFound;
