import CollectionSelection from '@/components/collections/CollectionSelection';
import Header from '@/components/header/Header';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/react/macro';
import Link from 'next/link';
import styles from './../page.module.css';

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
