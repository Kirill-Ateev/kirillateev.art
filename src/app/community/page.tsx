import CollectionLifeIsAnIllusion from '@/components/collections/CollectionLifeIsAnIllusion';
import Header from '@/components/header/Header';
import styles from '../page.module.css';

export default function Community() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.subTitle}>Recent Community Work</div>
          <a
            className={`${styles.menuItem} ${styles.secondaryText}`}
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
}
