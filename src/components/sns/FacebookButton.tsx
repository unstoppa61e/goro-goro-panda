import { FacebookShareButton, FacebookIcon } from 'next-share';

import React from 'react';
import { useRouter } from 'next/router';
import { Site } from '../../lib/site';

type Props = {
  text: string;
  size: number;
};

const TwitterButton = ({ text, size }: Props) => {
  const router = useRouter();
  const currentUrl = Site.origin + router.asPath;

  return (
    <FacebookShareButton
      url={currentUrl}
      quote={text}
      hashtag={`#${Site.title}`}
    >
      <FacebookIcon size={size} round />
    </FacebookShareButton>
  );
};

export default TwitterButton;
