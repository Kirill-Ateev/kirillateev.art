import CollectionAttentionless from '@/components/collections/CollectionAttentionless';
import CollectionCrosswalk from '@/components/collections/CollectionCrosswalk';
import CollectionLanes from '@/components/collections/CollectionLanes';
import CollectionNights from '@/components/collections/CollectionNights';
import CollectionWindow from '@/components/collections/CollectionWindow';
import Header from '@/components/header/Header';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/react/macro';
import styles from './page.module.css';

export default withLinguiPage(function Home() {
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
              Hi, I&apos;m Kirill Ateev. A generative artist working with code.
            </Trans>
          </div>
        </section>
        <CollectionWindow />
        <CollectionCrosswalk />
        <CollectionLanes />
        <CollectionAttentionless />
        <CollectionNights />
        {/* <CollectionLifeIsAnIllusion /> */}
        {/* <CollectionKindWords /> */}
      </main>
    </>
  );
});
