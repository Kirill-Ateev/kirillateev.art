import CollectionSelection from '@/components/collections/CollectionSelection';
import Header from '@/components/header/Header';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/react/macro';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './../page.module.css';

const titles: Record<string, string> = {
  en: 'Selection — Kirill Ateev',
  ru: 'Selection — Кирилл Атеев',
};

const descriptions: Record<string, string> = {
  en: 'A curated selection of individual works, triptychs, and small series by Kirill Ateev.',
  ru: 'Избранные индивидуальные работы, триптихи и малые серии Кирилла Атеева.',
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
      canonical: `https://kirillateev.art/${lang}/selection`,
    },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: `https://kirillateev.art/${lang}/selection`,
    },
  };
}

export default withLinguiPage(async function Home(props) {
  const params = await props.params;

  return (
    <>
      <Header />
      <main>
        <section className={styles.container}>
          <div className={styles.subtitle}>
            <Trans>Recent Work</Trans>
          </div>
          <div className={styles.text_secondary}>
            <Trans>
              Hi, I&apos;m Kirill Ateev, an artist working with code.
            </Trans>
          </div>
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
