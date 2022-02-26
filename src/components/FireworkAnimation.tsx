import { useEffect, useRef, useState } from 'react';
import type { LottiePlayer } from 'lottie-web';

const FireworkAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import('lottie-web')
      .then((Lottie) => setLottie(Lottie.default))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '/lotties/firework.json',
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return <div ref={ref} className="w-20 h-20" />;
};

export default FireworkAnimation;
