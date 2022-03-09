import { Site } from './src/lib/site';

export default {
  title: Site.title,
  description: Site.description,
  canonical: `${Site.origin}/`,
  openGraph: {
    url: Site.origin,
    title: Site.title,
    description: Site.description,
    images: [
      {
        url: `${Site.origin}/ogp/pr_314.png`,
        width: 1200,
        height: 630,
        alt: 'Og Image Alt',
        type: 'image/png',
      },
    ],
    site_name: Site.title,
    type: 'website',
  },
  twitter: {
    handle: '@unstoppa61e',
    site: '@unstoppa61e',
    cardType: 'summary_large_image',
  },
};
