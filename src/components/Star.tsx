import Image from 'next/image';

type Props = {
  isBright: boolean;
};

const Star = ({ isBright }: Props) => {
  return (
    <>
      <div className="flex justify-center items-center relative pointer-events-none">
        <div className="absolute flex justify-center items-center">
          <Image
            src="/star_yellow.png"
            width={21}
            height={21}
            objectFit="contain"
            alt="yellow star"
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            className={`transition-all ease-in duration-200 ${
              isBright ? 'delay-200 rotate-y-0' : 'rotate-y-90'
            }`}
          />
        </div>
        <Image
          src="/star_gray.png"
          width={21}
          height={21}
          objectFit="contain"
          alt="gray star"
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          className={`transition-all ease-in duration-200 ${
            isBright ? 'rotate-y-90' : 'rotate-y-0 delay-200'
          }`}
        />
      </div>
    </>
  );
};

export default Star;
