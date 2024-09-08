import CollectionKindWords from '@/components/collections/CollectionKindWords';
import CollectionNights from '@/components/collections/CollectionNights';
import Header from '@/components/header/Header';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.subTitle}>Recent Work</div>
          <div className={styles.secondaryText}>
            Hi, I&apos;m Kirill. A generative artist working with code.
          </div>
        </section>

        <CollectionNights />
        <CollectionKindWords />
      </main>
    </div>
  );
}
