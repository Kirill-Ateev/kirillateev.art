import { SITE, langUrl } from '@/constants/site';
import { locales } from '../../../lingui.config';

export function LangAlternates({ path = '' }: { path?: string }) {
  return (
    <>
      {locales.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={langUrl(lang, path)}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE}/`} />
    </>
  );
}
