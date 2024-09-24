import { basePath } from '@/constants';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../app/[lang]/page.module.css';

export default function Header() {
  const { i18n } = useLingui();
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href={`/${i18n.locale}`}>
        <Image
          src={`${basePath}/images/icons/initials.webp`}
          alt={`KA`}
          width="30"
          height="30"
        />
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
