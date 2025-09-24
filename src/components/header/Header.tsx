import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import Link from 'next/link';
import styles from '../../app/[lang]/page.module.css';
import Logo from './Logo';

export default function Header() {
  const { i18n } = useLingui();
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href={`/${i18n.locale}`}>
        <Logo />
      </Link>
      <div className={styles.menu_container}>
        <Link className={styles.menu_item} href={`/${i18n.locale}/messages`}>
          <Trans>Messages</Trans>
        </Link>
        <Link
          className={styles.menu_item}
          href={`https://t.me/kirill_ateev_art`}
        >
          <Trans>Community</Trans>
        </Link>
      </div>
    </header>
  );
}
