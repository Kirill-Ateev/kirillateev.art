import Header from '@/components/header/Header';
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
    },
  };
}

export default withLinguiPage(function Community() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.subtitle}>
            <Trans>Recent Community Work</Trans>
          </div>
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
