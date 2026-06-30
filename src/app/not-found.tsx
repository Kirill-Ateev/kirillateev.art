import { GTM } from '@/components/GTM/GTM';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import styles from './[lang]/page.module.css';
import './globals.css';

const nunito = localFont({
  src: './[lang]/fonts/Nunito.ttf',
  variable: '--font-nunito',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Not Found — Kirill Ateev',
  robots: 'noindex',
};

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://ipfs.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://vercel-rpc-view.vercel.app" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://og.rarible.com" />
        <GTM />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={nunito.variable}>
        <div className="container_error">
          <img
            src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
            alt="404"
          />
          <div className={styles.title}>Not found – 404</div>
          <div className={styles.menu_item}>
            <Link href="/en">Go back</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
