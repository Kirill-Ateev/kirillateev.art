import { allMessages } from '@/appRouterI18n';
import { GTM } from '@/components/GTM/GTM';
import { LinguiClientProvider } from '@/components/lingui/LinguiClientProvider';
import {
  homepageDescription,
  homepageTitle,
  langUrl,
  SITE,
  siteName,
} from '@/constants/site';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title = homepageTitle(lang);
  const description = homepageDescription(lang);
  const name = siteName(lang);

  return {
    title,
    description,
    metadataBase: new URL(SITE),
    alternates: {
      canonical: langUrl(lang),
    },
    openGraph: {
      title,
      description,
      url: langUrl(lang),
      siteName: name,
      type: 'website',
      images: [
        {
          url: '/og/home.png',
          width: 1200,
          height: 630,
          alt: `${name} — Artist`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/home.png'],
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/icon-192.png"
        />
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
