import Header from '@/components/header/Header';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/macro';
import styles from '../page.module.css';

export default withLinguiPage(function Contacts() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.subtitle}>
            <Trans>Get in Touch</Trans>
          </div>
          <div className={styles.text_secondary}>
            Telegram{' '}
            <a
              className={`${styles.menu_item} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://t.me/ateev_kirill"
            >
              @ateev_kirill
            </a>
          </div>
          {/* <div className={styles.text_secondary}>
            <Trans>Ask me a question in the community</Trans>{' '}
            <a
              className={`${styles.menu_item} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://t.me/selfcashflowgang"
            >
              @selfcashflowgang
            </a>
          </div> */}
        </section>
      </main>
    </div>
  );
});
