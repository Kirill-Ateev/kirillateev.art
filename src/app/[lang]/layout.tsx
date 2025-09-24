import { allMessages } from '@/appRouterI18n';
import { GTM } from '@/components/GTM/GTM';
import { LinguiClientProvider } from '@/components/lingui/LinguiClientProvider';
import { withLinguiLayout } from '@/withLingui';
import { t } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import localFont from 'next/font/local';
import React from 'react';
import linguiConfig from '../../../lingui.config';
import '../globals.css';

const nunito = localFont({
  src: './fonts/Nunito.ttf',
  variable: '--font-nunito',
  weight: '100 900',
});

export async function generateStaticParams() {
  return linguiConfig.locales.map((lang) => ({ lang }));
}

export default withLinguiLayout(async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const { i18n } = useLingui();

  return (
    <html lang={lang}>
      <head>
        <GTM />
        <link rel="canonical" href="https://kirillateev.art/en" />
        <link rel="alternate" href="https://kirillateev.art/ru" hrefLang="ru" />
        <link rel="alternate" href="https://kirillateev.art/en" hrefLang="en" />

        {/* Primary Meta Tags */}
        <title>{t(i18n)`Kirill Ateev - Artist`}</title>
        <meta name="title" content={t(i18n)`Kirill Ateev - Artist`} />
        <meta
          name="description"
          content={t(
            i18n
          )`Welcome to the official website of Kirill Ateev, a contemporary artist known for his unique generative artworks. Explore his portfolio, exhibitions, community, and more.`}
        />
        <meta
          name="keywords"
          content={t(
            i18n
          )`Kirill Ateev, artist, contemporary art, generative, community, exhibitions, portfolio`}
        />
        <meta name="author" content={t(i18n)`Kirill Ateev`} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kirillateev.art/" />
        <meta property="og:title" content={t(i18n)`Kirill Ateev - Artist`} />
        <meta
          property="og:description"
          content={t(
            i18n
          )`Welcome to the official website of Kirill Ateev, a contemporary artist known for his unique generative artworks. Explore his portfolio, exhibitions, community, and more.`}
        />
        <meta
          property="og:image"
          content="https://www.kirillateev.art/favicon.ico"
        />
        <meta
          property="og:image:alt"
          content={t(i18n)`Kirill Ateev's artwork`}
        />
        <meta property="og:site_name" content={t(i18n)`Kirill Ateev`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.kirillateev.art/" />
        <meta
          property="twitter:title"
          content={t(i18n)`Kirill Ateev - Artist`}
        />
        <meta
          property="twitter:description"
          content={t(
            i18n
          )`Welcome to the official website of Kirill Ateev, a contemporary artist known for his unique generative artworks. Explore his portfolio, exhibitions, community, and more.`}
        />
        <meta
          property="twitter:image"
          content="https://www.kirillateev.art/images/favicon.ico"
        />
        <meta
          property="twitter:image:alt"
          content={t(i18n)`Kirill Ateev's artwork`}
        />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={nunito.variable}>
        <LinguiClientProvider
          initialLocale={lang}
          initialMessages={allMessages[lang]!}
        >
          {children}
        </LinguiClientProvider>
        {/* <footer className={styles.footer} /> */}
      </body>
    </html>
  );
});
