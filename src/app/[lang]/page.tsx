import CollectionKindWords from '@/components/collections/CollectionKindWords';
import CollectionNights from '@/components/collections/CollectionNights';
import Header from '@/components/header/Header';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/macro';
import styles from './page.module.css';

export default withLinguiPage(function Home() {
  return (
    <div>
      <Header />
      <main>
        <section className={styles.container}>
          <div className={styles.subtitle}>
            <Trans>Recent Work</Trans>
          </div>
          <div className={styles.text_secondary}>
            <Trans>
              Hi, I&apos;m Kirill Ateev. A generative artist working with code.
            </Trans>
          </div>
        </section>

        <CollectionNights />
        <CollectionKindWords />
      </main>
      <footer className={styles.footer} />
    </div>
  );
});
