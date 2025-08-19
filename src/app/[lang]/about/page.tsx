import Header from '@/components/header/Header';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/macro';
import Link from 'next/link';
import styles from '../page.module.css';

export default withLinguiPage(function About() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.subtitle}>
            <Trans>Community</Trans>
          </div>
          <div className={styles.text_secondary}>
            Telegram{' '}
            <Link
              className={`${styles.menu_item} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://t.me/ateev_kirill"
            >
              @ateev_kirill
            </Link>
          </div>
          {/* <div className={styles.text_secondary}>
            <Trans>Ask me a question in the community</Trans>{' '}
            <Link
              className={`${styles.menu_item} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://t.me/selfcashflowgang"
            >
              @selfcashflowgang
            </Link>
          </div> */}
        </section>
      </main>
    </div>
  );
});
