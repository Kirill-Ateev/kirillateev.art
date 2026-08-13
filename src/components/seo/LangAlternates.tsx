import { locales } from '../../../lingui.config';

const SITE = 'https://kirillateev.art';

export function LangAlternates({ path = '' }: { path?: string }) {
  return (
    <>
      {locales.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${SITE}/${lang}${path}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE}/`} />
    </>
  );
}
