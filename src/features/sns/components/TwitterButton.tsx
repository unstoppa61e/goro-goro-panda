import { TwitterShareButton, TwitterIcon } from 'next-share';
import React from 'react';
import { useRouter } from 'next/router';
import { Site } from '../../../lib/site';

type Props = {
  text: string;
  size: number;
};

const TwitterButton = ({ text, size }: Props) => {
  const router = useRouter();
  const currentUrl = Site.origin + router.asPath;

  return (
    <TwitterShareButton
      url={currentUrl}
      title={text}
      hashtags={[Site.title, '円周率の日']}
      related={[Site.developer]}
    >
      <TwitterIcon size={size} round />
    </TwitterShareButton>
  );
};

export default TwitterButton;
