import { allMessages } from '@/appRouterI18n';
import { GTM } from '@/components/GTM/GTM';
import { LinguiClientProvider } from '@/components/lingui/LinguiClientProvider';
import { withLinguiLayout } from '@/withLingui';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';
import linguiConfig from '../../../lingui.config';
import '../globals.css';

const nunito = localFont({
  src: './fonts/Nunito.ttf',
  variable: '--font-nunito',
  weight: '100 900',
  preload: true,
});

export async function generateStaticParams() {
  return linguiConfig.locales.map((lang) => ({ lang }));
}

const siteName = 'Kirill Ateev';

const titles: Record<string, string> = {
  en: 'Kirill Ateev - Artist',
  ru: 'Кирилл Атеев — Художник',
};

const descriptions: Record<string, string> = {
  en: 'Welcome to the official website of Kirill Ateev, a contemporary artist known for his unique generative artworks. Explore his portfolio, exhibitions, community, and more.',
  ru: 'Добро пожаловать на официальный сайт Кирилла Атеева, современного художника, известного своими уникальными генеративными произведениями.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title = titles[lang] || titles.en;
  const description = descriptions[lang] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL('https://kirillateev.art'),
    alternates: {
      canonical: `https://kirillateev.art/${lang}`,
      languages: {
        en: 'https://kirillateev.art/en',
        ru: 'https://kirillateev.art/ru',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://kirillateev.art/${lang}`,
      siteName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: 'index, follow',
  };
}

export default withLinguiLayout(async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://ipfs.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://vercel-rpc-view.vercel.app" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://og.rarible.com" />
        <GTM />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={nunito.variable}>
        <LinguiClientProvider
          initialLocale={lang}
          initialMessages={allMessages[lang]!}
        >
          {children}
        </LinguiClientProvider>
      </body>
    </html>
  );
});
