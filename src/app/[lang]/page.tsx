import CollectionKindWords from '@/components/collections/CollectionKindWords';
import CollectionNights from '@/components/collections/CollectionNights';
import Header from '@/components/header/Header';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/macro';
import localFont from 'next/font/local';
import styles from './page.module.css';

export const nunito = localFont({
  src: './fonts/Nunito.ttf',
  variable: '--font-nunito',
  weight: '100 900',
});

export default withLinguiPage(function Home() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.subTitle}>
            <Trans>Recent Work</Trans>
          </div>
          <div className={styles.secondaryText}>
            <Trans>
              Hi, I&apos;m Kirill Ateev. A generative artist working with code.
            </Trans>
          </div>
        </section>

        <CollectionNights />
        <CollectionKindWords />
      </main>
    </div>
  );
});
