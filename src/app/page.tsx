import CollectionKindWords from '@/components/CollectionKindWords';
import CollectionNights from '@/components/CollectionNights';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.title}>Kirill Ateev</div>
        <div className={styles.menuContainer}>
          <a
            className={styles.menuItem}
            target="_blank"
            rel="noreferrer"
            href="https://t.me/ateev_kirill"
          >
            About
          </a>
          <a
            className={styles.menuItem}
            target="_blank"
            rel="noreferrer"
            href="https://t.me/selfcashflowgang"
          >
            Community
          </a>
          <a className={styles.menuItem}>Contacts</a>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.subTitle}>Recent Work</div>
          <div className={styles.secondaryText}>
            Hi, I&apos;m Kirill. A generative artist working with code.
          </div>
        </section>

        <CollectionNights />
        {/* TODO: сделать раздел community под это */}
        {/* <CollectionLifeIsAnIllusion /> */}
        <CollectionKindWords />
      </main>
    </div>
  );
}
