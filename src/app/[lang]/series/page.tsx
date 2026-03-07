import CollectionAttentionless from '@/components/collections/CollectionAttentionless';
import CollectionBlinds from '@/components/collections/CollectionBlinds';
import CollectionCity from '@/components/collections/CollectionCity';
import CollectionCocktailStraws from '@/components/collections/CollectionCocktailStraws';
import CollectionCrosswalk from '@/components/collections/CollectionCrosswalk';
import CollectionFolds from '@/components/collections/CollectionFolds';
import CollectionFrames from '@/components/collections/CollectionFrames';
import CollectionWindow from '@/components/collections/CollectionWindow';
import Header from '@/components/header/Header';
import LazyHydrate from '@/components/layout/LazyHydrate';
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
              className={`${styles.menu_item} ${styles.active}`}
            >
              <Trans>Series</Trans>
            </Link>
            <Link
              href={`/${params.lang}/selection`}
              className={`${styles.menu_item}`}
            >
              <Trans>Selection</Trans>
            </Link>
          </div>
        </section>

        <CollectionFolds />
        <CollectionFrames />
        <CollectionCity />
        <LazyHydrate placeholderHeight="508px">
          <CollectionBlinds />
        </LazyHydrate>
        <LazyHydrate placeholderHeight="508px">
          <CollectionCocktailStraws />
        </LazyHydrate>
        <LazyHydrate placeholderHeight="508px">
          <CollectionWindow />
        </LazyHydrate>
        <LazyHydrate placeholderHeight="508px">
          <CollectionCrosswalk />
        </LazyHydrate>
        {/* <LazyHydrate placeholderHeight="508px">
          <CollectionLanes />
        </LazyHydrate> */}
        <LazyHydrate placeholderHeight="508px">
          <CollectionAttentionless />
        </LazyHydrate>
        {/* <LazyHydrate placeholderHeight="508px">
          <CollectionLifeIsAnIllusion />
        </LazyHydrate>
        <LazyHydrate placeholderHeight="508px">
          <CollectionKindWords />
        </LazyHydrate> */}
      </main>
    </>
  );
});
