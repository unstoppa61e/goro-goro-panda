import { IconContext } from 'react-icons';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  const iconSize = 16;

  return (
    <footer className="flex justify-center items-center bg-black h-8 text-white">
      <div className="flex items-center gap-x-3">
        <p className="text-xs">&copy; 2022 unstoppa61e</p>
        <div className="flex items-center gap-x-3">
          <a
            href="https://note.com/unstoppa61e/n/nd3cdb84b41ad"
            className="flex justify-center items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/note_logo_symbol.png"
              width={iconSize}
              height={iconSize}
              objectFit="contain"
              alt="wordplay"
              onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
                e.preventDefault()
              }
              onMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
                e.preventDefault()
              }
            />
          </a>
          <a
            href="https://twitter.com/unstoppa61e"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconContext.Provider value={{ size: `${iconSize}px` }}>
              <FaTwitter />
            </IconContext.Provider>
          </a>
          <a
            href="https://github.com/unstoppa61e/goro-goro-panda"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconContext.Provider value={{ size: `${iconSize}px` }}>
              <FaGithub />
            </IconContext.Provider>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
