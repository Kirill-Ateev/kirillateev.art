import CollectionAttentionless from '@/components/collections/CollectionAttentionless';
import CollectionBlinds from '@/components/collections/CollectionBlinds';
import CollectionCity from '@/components/collections/CollectionCity';
import CollectionCocktailStraws from '@/components/collections/CollectionCocktailStraws';
import CollectionCrosswalk from '@/components/collections/CollectionCrosswalk';
import CollectionFolds from '@/components/collections/CollectionFolds';
import CollectionFrames from '@/components/collections/CollectionFrames';
import CollectionWindow from '@/components/collections/CollectionWindow';
import Header from '@/components/header/Header';
import LazyHydrate from '@/components/layout/LazyHydrate';
import { LangAlternates } from '@/components/seo/LangAlternates';
import { langUrl, SITE, siteName } from '@/constants/site';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/react/macro';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    alternates: {
      canonical: langUrl(lang),
    },
    openGraph: {
      url: langUrl(lang),
      images: [
        {
          url: '/og/home.png',
          width: 1200,
          height: 630,
          alt: `${siteName(lang)} — Artist`,
        },
      ],
    },
  };
}

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: siteName('en'),
      inLanguage: ['en', 'ru'],
      publisher: { '@id': `${SITE}/#artist` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE}/#artist`,
      name: siteName('en'),
      url: `${SITE}/`,
      jobTitle: 'Artist',
      sameAs: ['https://t.me/kirill_ateev_art'],
    },
  ],
};

export default withLinguiPage(async function Home(props) {
  const params = await props.params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
      <LangAlternates />
      <Header />
      <main>
        <section className={styles.container}>
          <div className={styles.subtitle}>
            <Trans>Recent Work</Trans>
          </div>
          <h1 className={styles.text_secondary}>
            <Trans>
              Hi, I&apos;m Kirill Ateev, an artist working with code.
            </Trans>
          </h1>
          <div className={styles.tab_container}>
            <Link
              href={`/${params.lang}/series`}
              className={`${styles.menu_item} ${styles.active}`}
            >
              <Trans>Series</Trans>
            </Link>
            <Link
              href={`/${params.lang}/selection`}
              className={`${styles.menu_item}`}
            >
              <Trans>Selection</Trans>
            </Link>
          </div>
        </section>

        <CollectionFolds priority fetchPriority="high" />
        <CollectionFrames />
        <CollectionCity />
        <LazyHydrate placeholderHeight="508px">
          <CollectionBlinds />
        </LazyHydrate>
        <LazyHydrate placeholderHeight="508px">
          <CollectionCocktailStraws />
        </LazyHydrate>
        <LazyHydrate placeholderHeight="508px">
          <CollectionWindow />
        </LazyHydrate>
        <LazyHydrate placeholderHeight="508px">
          <CollectionCrosswalk />
        </LazyHydrate>
        {/* <LazyHydrate placeholderHeight="508px">
          <CollectionLanes />
        </LazyHydrate> */}
        <LazyHydrate placeholderHeight="508px">
          <CollectionAttentionless />
        </LazyHydrate>
        {/* <LazyHydrate placeholderHeight="508px">
          <CollectionLifeIsAnIllusion />
        </LazyHydrate>
        <LazyHydrate placeholderHeight="508px">
          <CollectionKindWords />
        </LazyHydrate> */}
      </main>
    </>
  );
});
