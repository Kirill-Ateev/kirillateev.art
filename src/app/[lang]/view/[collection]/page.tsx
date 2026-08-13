import Header from '@/components/header/Header';
import { LangAlternates } from '@/components/seo/LangAlternates';
import { TokenViewer } from '@/components/viewer/TokenViewer';
import { collectionsData } from '@/constants/collections';
import { getRandomFromRange } from '@/utils/numbers';
import { withLinguiPage } from '@/withLingui';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { locales } from '../../../../../lingui.config';
import styles from '../../page.module.css';

const siteNames: Record<string, string> = {
  en: 'Kirill Ateev',
  ru: 'Кирилл Атеев',
};

export async function generateStaticParams() {
  const paths: { collection: string; lang: string }[] = [];
  Object.keys(collectionsData).forEach((collectionName) => {
    locales.forEach((lang) => {
      paths.push({
        collection: collectionName,
        lang,
      });
    });
  });

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; collection: keyof typeof collectionsData }>;
}): Promise<Metadata> {
  const { lang, collection } = await params;
  const collectionMeta = collectionsData[collection];
  if (!collectionMeta) return {};

  const siteName = siteNames[lang] || siteNames.en;
  const description =
    collectionMeta.descriptions?.[lang] || collectionMeta.description;
  const title = `${collectionMeta.name} by ${siteName}`;
  const url = `https://kirillateev.art/${lang}/view/${collection}`;

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

export default withLinguiPage(async function CollectionViewer({
  params,
}: {
  params: Promise<{ lang: string; collection: keyof typeof collectionsData }>;
}) {
  const { lang, collection } = await params;
  const collectionMeta = collectionsData[collection];
  if (!collectionMeta) return null;

  const siteName = siteNames[lang] || siteNames.en;
  const description =
    collectionMeta.descriptions?.[lang] || collectionMeta.description;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: siteName,
        item: 'https://kirillateev.art/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: collectionMeta.name,
        item: `https://kirillateev.art/${lang}/view/${collection}`,
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${collectionMeta.name} by ${siteName}`,
    description,
    url: `https://kirillateev.art/${lang}/view/${collection}`,
    inLanguage: lang,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: 'https://kirillateev.art/',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <LangAlternates path={`/view/${collection}`} />
      <Header />
      <main className={styles.main}>
        <Suspense>
          <TokenViewer
            collectionMetadata={collectionMeta}
            baseRoute={`/${collection}`}
            tokenId={getRandomFromRange(
              collectionMeta.minIndex,
              collectionMeta.maxIndex,
            )}
          />
        </Suspense>
      </main>
    </div>
  );
});
