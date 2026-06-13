import Header from '@/components/header/Header';
import { ERC721Viewer } from '@/components/viewer/ERC721Viewer';
import { collectionsData } from '@/constants/collections';
import { withLinguiPage } from '@/withLingui';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { locales } from '../../../../../lingui.config';
import styles from '../../page.module.css';

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

  const title = `${collectionMeta.name} by Kirill Ateev`;
  const description = collectionMeta.description;
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
    },
  };
}

export default withLinguiPage(async function CollectionViewer({
  params,
}: {
  params: Promise<{ lang: string; collection: keyof typeof collectionsData }>;
}) {
  const { collection } = await params;
  const collectionMetadata = collectionsData[collection];
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <Suspense>
          <ERC721Viewer collectionMetadata={collectionMetadata} />
        </Suspense>
      </main>
    </div>
  );
});
