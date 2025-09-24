import Header from '@/components/header/Header';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/react/macro';
import Link from 'next/link';
import styles from '../page.module.css';

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
