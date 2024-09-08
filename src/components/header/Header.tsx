import Link from 'next/link';
import styles from '../../app/page.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.title}>Kirill Ateev</div>
      </Link>
      <div className={styles.menuContainer}>
        <Link className={styles.menuItem} href="/community">
          Community
        </Link>
        <Link className={styles.menuItem} href="/contacts">
          Contacts
        </Link>
      </div>
    </header>
  );
}
