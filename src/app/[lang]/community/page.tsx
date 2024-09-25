import CollectionLifeIsAnIllusion from '@/components/collections/CollectionLifeIsAnIllusion';
import Header from '@/components/header/Header';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/macro';
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
          <a
            className={`${styles.menu_item} ${styles.text_secondary}`}
            target="_blank"
            rel="noreferrer"
            href="https://t.me/selfcashflowgang"
          >
            @selfcashflowgang
          </a>
        </section>
        <CollectionLifeIsAnIllusion />
      </main>
    </div>
  );
});
