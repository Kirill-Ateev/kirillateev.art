import Header from '@/components/header/Header';
import { LangAlternates } from '@/components/seo/LangAlternates';
import { TokenViewer } from '@/components/viewer/TokenViewer';
import { collectionsData } from '@/constants/collections';
import { withLinguiPage } from '@/withLingui';
import type { Metadata } from 'next';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { Suspense } from 'react';
import { locales } from '../../../../../../lingui.config';
import styles from '../../../page.module.css';

const siteNames: Record<string, string> = {
  en: 'Kirill Ateev',
  ru: 'Кирилл Атеев',
};

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

  const siteName = siteNames[lang] || siteNames.en;
  const collectionDescription =
    collectionMeta.descriptions?.[lang] || collectionMeta.description;
  const title = `${collectionMeta.name} #${tokenId} — ${siteName}`;
  const description = `${collectionMeta.name} #${tokenId} — ${collectionDescription}`;
  const url = `${SITE}/${lang}/view/${collection}/${tokenId}`;

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
      siteName,
      images: [
        {
          url: `/og/${collection}.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og/${collection}.png`],
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
  if (!collectionMeta) return null;

  const siteName = siteNames[lang] || siteNames.en;
  const collectionDescription =
    collectionMeta.descriptions?.[lang] || collectionMeta.description;
  const tokenUrl = `${SITE}/${lang}/view/${collection}/${tokenId}`;

  const localImagePath =
    collectionMeta.imageExt &&
    existsSync(
      resolve(
        process.cwd(),
        'public',
        'images',
        collection,
        `${tokenId}.${collectionMeta.imageExt}`,
      ),
    )
      ? `${SITE}/images/${collection}/${tokenId}.${collectionMeta.imageExt}`
      : undefined;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: siteName,
        item: `${SITE}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: collectionMeta.name,
        item: `${SITE}/${lang}/view/${collection}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${collectionMeta.name} #${tokenId}`,
        item: tokenUrl,
      },
    ],
  };

  const artistJsonLd = {
    '@type': 'Person',
    name: 'Kirill Ateev',
    url: `${SITE}/`,
    sameAs: ['https://t.me/kirill_ateev_art'],
  };

  const artworkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: `${collectionMeta.name} #${tokenId}`,
    description: `${collectionMeta.name} #${tokenId} — ${collectionDescription}`,
    artform: 'SVG',
    artMedium: 'Generative algorithm (on-chain SVG)',
    ...(localImagePath ? { image: localImagePath } : {}),
    artist: artistJsonLd,
    creator: artistJsonLd,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artworkJsonLd) }}
      />
      <LangAlternates path={`/view/${collection}/${tokenId}`} />
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
