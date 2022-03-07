import { TwitterShareButton, TwitterIcon } from 'next-share';
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
    <TwitterShareButton
      url={currentUrl}
      title={text}
      hashtags={['ゴロゴロ円周率', '円周率の日']}
      related={['unstoppa61e']}
    >
      <TwitterIcon size={size} round />
    </TwitterShareButton>
  );
};

export default TwitterButton;
