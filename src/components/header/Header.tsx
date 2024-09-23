import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Link from 'next/link';
import styles from '../../app/[lang]/page.module.css';

export default function Header() {
  const { i18n } = useLingui();
  return (
    <header className={styles.header}>
      <Link href={`/${i18n.locale}`}>
        <div className={styles.title}>
          <Trans>Kirill Ateev</Trans>
        </div>
      </Link>
      <div className={styles.menuContainer}>
        <Link className={styles.menuItem} href={`/${i18n.locale}/community`}>
          <Trans>Community</Trans>
        </Link>
        <Link className={styles.menuItem} href={`/${i18n.locale}/contacts`}>
          <Trans>Contacts</Trans>
        </Link>
      </div>
    </header>
  );
}
