import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import Link from 'next/link';
import styles from '../../app/[lang]/page.module.css';
import { Switcher } from '../lingui/Switcher';
import { BurgerMenu } from './BurgerMenu';
import Logo from './Logo';

export default function Header() {
  const { i18n } = useLingui();
  const menu = (
    <>
      <Link className={styles.menu_item} href={`/${i18n.locale}/messages`}>
        <Trans>Messages</Trans>
      </Link>
      <Link
        className={styles.menu_item}
        href={`https://t.me/kirill_ateev_art`}
      >
        <Trans>Community</Trans>
      </Link>
      <Switcher />
    </>
  );
  return (
    <header className={styles.header}>
      <Link
        className={styles.logo}
        href={`/${i18n.locale}`}
        aria-label="Kirill Ateev Art Logo"
      >
        <Logo />
        <span className={styles.hide}>Kirill Ateev Art</span>
      </Link>
      <div className={styles.menu_container}>{menu}</div>
      <BurgerMenu>{menu}</BurgerMenu>
    </header>
  );
}
