import Header from '@/components/header/Header';
import { LangAlternates } from '@/components/seo/LangAlternates';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/react/macro';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../page.module.css';

const titles: Record<string, string> = {
  en: 'Community — Kirill Ateev',
  ru: 'Сообщество — Кирилл Атеев',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: titles[lang] || titles.en,
    alternates: {
      canonical: `https://kirillateev.art/${lang}/community`,
    },
    openGraph: {
      title: titles[lang] || titles.en,
      url: `https://kirillateev.art/${lang}/community`,
      images: [
        {
          url: '/og/home.png',
          width: 1200,
          height: 630,
          alt: 'Community — Kirill Ateev',
        },
      ],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default withLinguiPage(function Community() {
  return (
    <div>
      <LangAlternates path="/community" />
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <h1 className={styles.subtitle}>
            <Trans>Recent Community Work</Trans>
          </h1>
          <Link
            className={`${styles.menu_item} ${styles.text_secondary}`}
            target="_blank"
            rel="noreferrer"
            href="https://t.me/kirill_ateev_art"
          >
            @kirill_ateev_art
          </Link>
        </section>
        {/* <CollectionLifeIsAnIllusion /> */}
      </main>
    </div>
  );
});
