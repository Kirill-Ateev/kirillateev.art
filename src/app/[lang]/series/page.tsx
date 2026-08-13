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
import styles from './../page.module.css';

const pageTitles: Record<string, string> = {
  en: 'Series',
  ru: 'Серии',
};

const pageDescriptions: Record<string, string> = {
  en: 'All series and collections of generative art by Kirill Ateev: Folds, Frames, City, Blinds, Window, Crosswalk, Lanes and more. Kinetic minimalism (kinimalism) on Ethereum.',
  ru: 'Все серии и коллекции генеративного искусства Кирилла Атеева: Folds, Frames, City, Blinds, Window, Crosswalk, Lanes и другие. Кинетический минимализм (кинимализм) на Ethereum.',
};

function pageTitle(lang: string) {
  return `${pageTitles[lang] || pageTitles.en} — ${siteName(lang)}`;
}

function pageDescription(lang: string) {
  return pageDescriptions[lang] || pageDescriptions.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: pageTitle(lang),
    description: pageDescription(lang),
    alternates: {
      canonical: langUrl(lang, '/series'),
    },
    openGraph: {
      title: pageTitle(lang),
      description: pageDescription(lang),
      url: langUrl(lang, '/series'),
      images: [
        {
          url: '/og/home.png',
          width: 1200,
          height: 630,
          alt: 'Series by Kirill Ateev',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle(lang),
      description: pageDescription(lang),
      images: ['/og/home.png'],
    },
  };
}

const seriesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Series',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Selection', url: `${SITE}/en/view/selection` },
    { '@type': 'ListItem', position: 2, name: 'Folds', url: `${SITE}/en/view/folds` },
    { '@type': 'ListItem', position: 3, name: 'Frames', url: `${SITE}/en/view/frames` },
    { '@type': 'ListItem', position: 4, name: 'City', url: `${SITE}/en/view/city` },
    { '@type': 'ListItem', position: 5, name: 'Blinds', url: `${SITE}/en/view/blinds` },
    { '@type': 'ListItem', position: 6, name: 'Cocktail straws', url: `${SITE}/en/view/cocktail-straws` },
    { '@type': 'ListItem', position: 7, name: 'Window', url: `${SITE}/en/view/window` },
    { '@type': 'ListItem', position: 8, name: 'Crosswalk', url: `${SITE}/en/view/crosswalk` },
    { '@type': 'ListItem', position: 9, name: 'Lanes', url: `${SITE}/en/view/lanes` },
    { '@type': 'ListItem', position: 10, name: 'Attentionless', url: `${SITE}/en/view/attentionless` },
  ],
};

export default withLinguiPage(async function Home(props) {
  const params = await props.params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesJsonLd) }}
      />
      <LangAlternates path="/series" />
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

        <CollectionFolds />
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
