export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const userLocale =
  //   typeof window !== 'undefined' ? navigator.language.split('-')[0] : 'en';
  // const localeToRedirect = locales.includes(userLocale) ? userLocale : 'en';
  // const i18n = getI18nInstance(localeToRedirect);
  // const lang = i18n.locale;

  return (
    <html>
      <body>
        {/* <LinguiClientProvider
          initialLocale={lang}
          initialMessages={allMessages[lang]!}
        > */}
        {children}
        {/* </LinguiClientProvider> */}
      </body>
    </html>
  );
}
