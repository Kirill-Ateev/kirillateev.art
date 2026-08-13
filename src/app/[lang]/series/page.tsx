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
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/react/macro';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './../page.module.css';

const titles: Record<string, string> = {
  en: 'Series — Kirill Ateev',
  ru: 'Серии — Кирилл Атеев',
};

const descriptions: Record<string, string> = {
  en: 'All series and collections of generative art by Kirill Ateev: Folds, Frames, City, Blinds, Window, Crosswalk, Lanes and more. Kinetic minimalism (kinimalism) on Ethereum.',
  ru: 'Все серии и коллекции генеративного искусства Кирилла Атеева: Folds, Frames, City, Blinds, Window, Crosswalk, Lanes и другие. Кинетический минимализм (кинимализм) на Ethereum.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: `https://kirillateev.art/${lang}/series`,
    },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: `https://kirillateev.art/${lang}/series`,
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
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      images: ['/og/home.png'],
    },
  };
}

const seriesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Series',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Selection', url: 'https://kirillateev.art/en/view/selection' },
    { '@type': 'ListItem', position: 2, name: 'Folds', url: 'https://kirillateev.art/en/view/folds' },
    { '@type': 'ListItem', position: 3, name: 'Frames', url: 'https://kirillateev.art/en/view/frames' },
    { '@type': 'ListItem', position: 4, name: 'City', url: 'https://kirillateev.art/en/view/city' },
    { '@type': 'ListItem', position: 5, name: 'Blinds', url: 'https://kirillateev.art/en/view/blinds' },
    { '@type': 'ListItem', position: 6, name: 'Cocktail straws', url: 'https://kirillateev.art/en/view/cocktail-straws' },
    { '@type': 'ListItem', position: 7, name: 'Window', url: 'https://kirillateev.art/en/view/window' },
    { '@type': 'ListItem', position: 8, name: 'Crosswalk', url: 'https://kirillateev.art/en/view/crosswalk' },
    { '@type': 'ListItem', position: 9, name: 'Lanes', url: 'https://kirillateev.art/en/view/lanes' },
    { '@type': 'ListItem', position: 10, name: 'Attentionless', url: 'https://kirillateev.art/en/view/attentionless' },
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
