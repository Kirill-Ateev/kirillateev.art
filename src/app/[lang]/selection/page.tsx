import CollectionSelection from '@/components/collections/CollectionSelection';
import Header from '@/components/header/Header';
import { LangAlternates } from '@/components/seo/LangAlternates';
import { langUrl, SITE, siteName } from '@/constants/site';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/react/macro';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './../page.module.css';

const pageDescriptions: Record<string, string> = {
  en: 'A curated selection of individual works, triptychs, and small series by Kirill Ateev.',
  ru: 'Избранные индивидуальные работы, триптихи и малые серии Кирилла Атеева.',
  zh: 'Kirill Ateev 的单件作品、三联画与小型系列精选。',
  hi: 'Kirill Ateev की व्यक्तिगत कृतियों, ट्रिप्टिक और छोटी श्रृंखलाओं का एक चुनिंदा संग्रह।',
  es: 'Una selección de obras individuales, trípticos y series pequeñas de Kirill Ateev.',
};

function pageTitle(lang: string) {
  return `Selection — ${siteName(lang)}`;
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
      canonical: langUrl(lang, '/selection'),
    },
    openGraph: {
      title: pageTitle(lang),
      description: pageDescription(lang),
      url: langUrl(lang, '/selection'),
      images: [
        {
          url: '/og/selection.png',
          width: 1200,
          height: 630,
          alt: 'Selection by Kirill Ateev',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle(lang),
      description: pageDescription(lang),
      images: ['/og/selection.png'],
    },
  };
}

const selectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Selection',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Berry #1',
      url: `${SITE}/en/view/selection/1`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Berry #2',
      url: `${SITE}/en/view/selection/2`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Field',
      url: `${SITE}/en/view/selection/3`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Egg',
      url: `${SITE}/en/view/selection/4`,
    },
  ],
};

export default withLinguiPage(async function Home(props) {
  const params = await props.params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(selectionJsonLd) }}
      />
      <LangAlternates path="/selection" />
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
              className={`${styles.menu_item}`}
            >
              <Trans>Series</Trans>
            </Link>
            <Link
              href={`/${params.lang}/selection`}
              className={`${styles.menu_item} ${styles.active}`}
            >
              <Trans>Selection</Trans>
            </Link>
          </div>
        </section>
        <CollectionSelection />
      </main>
    </>
  );
});
