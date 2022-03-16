import { IconContext } from 'react-icons';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import React from 'react';
import { Site } from '../../lib/site';

const Footer = () => {
  const iconSize = 16;

  return (
    <footer className="flex justify-center items-center text-white py-3">
      <div className="flex items-center gap-x-2.5">
        <p className="text-xs">&copy; 2022 {Site.developer}</p>
        <div className="flex items-center">
          <a
            href={Site.note}
            className="flex justify-center items-center p-2.5"
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
            href={Site.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5"
          >
            <IconContext.Provider value={{ size: `${iconSize}px` }}>
              <FaTwitter />
            </IconContext.Provider>
          </a>
          <a
            href={Site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5"
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
