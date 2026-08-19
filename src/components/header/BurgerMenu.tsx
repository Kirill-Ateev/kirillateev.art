'use client';

import { useLingui } from '@lingui/react/macro';
import { useCallback, useState } from 'react';
import { Drawer } from './Drawer';
import styles from './BurgerMenu.module.css';

type BurgerMenuProps = {
  children: React.ReactNode;
};

export function BurgerMenu({ children }: BurgerMenuProps) {
  const [open, setOpen] = useState(false);

  const { t } = useLingui();
  const openLabel = t`Open menu`;
  const closeLabel = t`Close menu`;

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <div className={styles.burger}>
      <button
        type="button"
        className={`${styles.button} ${open ? styles.buttonOpen : ''}`}
        onClick={toggle}
        aria-label={open ? closeLabel : openLabel}
        aria-expanded={open}
        aria-controls="site-drawer"
      >
        <span className={styles.lines} aria-hidden="true">
          <span className={styles.line} />
          <span className={styles.line} />
          <span className={styles.line} />
        </span>
      </button>
      <Drawer open={open} onClose={close}>
        {children}
      </Drawer>
    </div>
  );
}