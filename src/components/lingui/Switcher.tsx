'use client';

import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Switcher.module.css';

type LOCALES = keyof typeof languages;

const languages = {
  en: msg`English`,
  ru: msg`Русский`,
} as const;

export function Switcher() {
  const router = useRouter();
  const { i18n } = useLingui();
  const pathname = usePathname();

  const [locale, setLocale] = useState<LOCALES>(
    (pathname?.split('/')[1] as LOCALES) || i18n.locale,
  );

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as LOCALES;
    if (nextLocale === locale) return;

    const pathNameWithoutLocale = pathname?.split('/')?.slice(2) ?? [];
    const newPath = `/${nextLocale}/${pathNameWithoutLocale.join('/')}`;

    setLocale(nextLocale);
    router.push(newPath);
  }

  return (
    <select
      className={styles.select}
      value={locale}
      onChange={handleChange}
      aria-label="Language"
    >
      {(Object.keys(languages) as LOCALES[]).map((lang) => (
        <option key={lang} value={lang}>
          {i18n._(languages[lang])}
        </option>
      ))}
    </select>
  );
}