import { FacebookShareButton, FacebookIcon } from 'next-share';

import React from 'react';
import { useRouter } from 'next/router';
import { baseUrl } from '../pages/stages/[stage]';

type Props = {
  text: string;
  size: number;
};

const TwitterButton = ({ text, size }: Props) => {
  const router = useRouter();
  const currentUrl = baseUrl + router.asPath;

  return (
    <FacebookShareButton
      url={currentUrl}
      quote={text}
      hashtag={'#ゴロゴロ円周率'}
    >
      <FacebookIcon size={size} round />
    </FacebookShareButton>
  );
};

export default TwitterButton;
