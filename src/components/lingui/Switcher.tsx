'use client';
// this is a client component because it uses the `useState` hook

import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type LOCALES = 'en' | 'ru';

const languages = {
  en: msg`English`,
  ru: msg`Русский`,
} as const;

export function Switcher() {
  const router = useRouter();
  const { i18n } = useLingui();
  const pathname = usePathname();

  const [locale, setLocale] = useState<LOCALES>(
    pathname?.split('/')[1] as LOCALES
  );

  // We can also demonstrate the 'pseudo' locale functionality
  // if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') {
  //   languages['pseudo'] = t`Pseudo`
  // }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const locale = event.target.value as LOCALES;

    const pathNameWithoutLocale = pathname?.split('/')?.slice(2) ?? [];
    const newPath = `/${locale}/${pathNameWithoutLocale.join('/')}`;

    setLocale(locale);
    router.push(newPath);
  }

  return (
    <select value={locale} onChange={handleChange}>
      {Object.keys(languages).map((locale) => {
        return (
          <option value={locale} key={locale}>
            {i18n._(languages[locale as keyof typeof languages])}
          </option>
        );
      })}
    </select>
  );
}
