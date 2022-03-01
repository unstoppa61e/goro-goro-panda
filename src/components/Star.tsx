import Image from 'next/image';
import React from 'react';

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
            onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
              e.preventDefault()
            }
            onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
              e.preventDefault()
            }
            className={`${isBright ? 'animate-swing' : 'invisible'}`}
          />
        </div>
        <Image
          src="/star_gray.png"
          width={21}
          height={21}
          objectFit="contain"
          alt="gray star"
          onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
          onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
            e.preventDefault()
          }
          className={` ${isBright ? 'invisible' : ''}`}
        />
      </div>
    </>
  );
};

export default Star;
