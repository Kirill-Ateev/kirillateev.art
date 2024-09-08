import Header from '@/components/header/Header';
import styles from '../page.module.css';

export default function Contacts() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.subTitle}>Get in Touch</div>
          <div className={styles.secondaryText}>
            Telegram{' '}
            <a
              className={`${styles.menuItem} ${styles.secondaryText}`}
              target="_blank"
              rel="noreferrer"
              href="https://t.me/ateev_kirill"
            >
              @ateev_kirill
            </a>
          </div>
          <div className={styles.secondaryText}>
            Ask me a question in the community{' '}
            <a
              className={`${styles.menuItem} ${styles.secondaryText}`}
              target="_blank"
              rel="noreferrer"
              href="https://t.me/selfcashflowgang"
            >
              @selfcashflowgang
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
