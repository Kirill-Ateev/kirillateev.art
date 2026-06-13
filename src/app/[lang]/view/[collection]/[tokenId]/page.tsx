import Header from '@/components/header/Header';
import { TokenViewer } from '@/components/viewer/TokenViewer';
import { collectionsData } from '@/constants/collections';
import { withLinguiPage } from '@/withLingui';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { locales } from '../../../../../../lingui.config';
import styles from '../../../page.module.css';

export async function generateStaticParams() {
  const paths: { collection: string; lang: string; tokenId: string }[] = [];
  for (const [collectionKey, collection] of Object.entries(collectionsData)) {
    for (
      let tokenId = collection.minIndex;
      tokenId <= collection.maxIndex;
      tokenId++
    ) {
      for (const lang of locales) {
        paths.push({
          collection: collectionKey,
          lang,
          tokenId: tokenId.toString(),
        });
      }
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    lang: string;
    collection: keyof typeof collectionsData;
    tokenId: string;
  }>;
}): Promise<Metadata> {
  const { lang, collection, tokenId } = await params;
  const collectionMeta = collectionsData[collection];
  if (!collectionMeta) return {};

  const title = `${collectionMeta.name} #${tokenId} — Kirill Ateev`;
  const description = collectionMeta.description;
  const url = `https://kirillateev.art/${lang}/view/${collection}/${tokenId}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Kirill Ateev',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default withLinguiPage(async function TokenPage({
  params,
}: {
  params: Promise<{
    lang: string;
    collection: keyof typeof collectionsData;
    tokenId: string;
  }>;
}) {
  const { lang, collection, tokenId } = await params;
  const collectionMeta = collectionsData[collection];

  const tokenUrl = `https://kirillateev.art/${lang}/view/${collection}/${tokenId}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: `${collectionMeta.name} #${tokenId}`,
    description: `${collectionMeta.name} #${tokenId} — On-chain generative NFT artwork by Kirill Ateev.`,
    artMedium: 'Generative algorithm (on-chain SVG)',
    artform: 'Rarible',
    artist: {
      '@type': 'Person',
      name: 'Kirill Ateev',
      url: 'https://kirillateev.art',
    },
    url: tokenUrl,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Person',
        name: 'Kirill Ateev',
      },
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className={styles.main}>
        <Suspense>
          <TokenViewer
            collectionMetadata={collectionMeta}
            tokenId={Number(tokenId)}
          />
        </Suspense>
      </main>
    </div>
  );
});
