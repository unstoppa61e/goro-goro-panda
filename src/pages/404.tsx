import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/').catch((e) => {
        console.log(e);
      });
    }, 3000);
  }, []);

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
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
        />
      </div>

      <div className="text-xl font-kosugi-maru mt-6">
        <p>このページはありません。</p>
        <p>
          ３秒後に
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
