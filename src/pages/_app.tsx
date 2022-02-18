import type { AppProps } from 'next/app';
import { DefaultSeo, NextSeo } from 'next-seo';

import '../styles/globals.css';
import SEO from '../../next-seo.config';

export const clearedStage = 'clearedStage';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <NextSeo
        additionalLinkTags={[
          {
            rel: 'icon',
            href: 'https://gorogoropanda.com/favicon.ico',
          },
          {
            rel: 'icon',
            href: 'https://gorogoropanda.com/favicon-16x16.png',
            sizes: '16x16',
          },
          {
            rel: 'icon',
            href: 'https://gorogoropanda.com/favicon-32x32.png',
            sizes: '32x32',
          },
          {
            rel: 'apple-touch-icon',
            href: 'https://gorogoropanda.com/apple-touch-icon.png',
            sizes: '180x180',
          },
          {
            rel: 'icon',
            href: 'https://gorogoropanda.com/android-chrome-192x192.png',
            sizes: '192x192',
          },
          {
            rel: 'icon',
            href: 'https://gorogoropanda.com/android-chrome-512x512.png',
            sizes: '512x512',
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
