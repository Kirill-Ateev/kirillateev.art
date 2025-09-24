import { GTM } from '@/components/GTM/GTM';
import localFont from 'next/font/local';
import Link from 'next/link';
import styles from './[lang]/page.module.css';
import './globals.css';

const nunito = localFont({
  src: './[lang]/fonts/Nunito.ttf',
  variable: '--font-nunito',
  weight: '100 900',
});

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <GTM />
        <link rel="canonical" href="https://kirillateev.art/en" />
        <link rel="alternate" href="https://kirillateev.art/en" hrefLang="en" />
        <link rel="alternate" href="https://kirillateev.art/ru" hrefLang="ru" />

        {/* Primary Meta Tags */}
        <title>{`Kirill Ateev - Artist`}</title>
        <meta name="title" content={`Kirill Ateev - Artist`} />
        <meta
          name="description"
          content={`Welcome to the official website of Kirill Ateev, a contemporary artist known for his unique generative artworks. Explore his portfolio, exhibitions, community, and more.`}
        />
        <meta
          name="keywords"
          content={`Kirill Ateev, artist, contemporary art, generative, community, exhibitions, portfolio`}
        />
        <meta name="author" content={`Kirill Ateev`} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kirillateev.art/" />
        <meta property="og:title" content={`Kirill Ateev - Artist`} />
        <meta
          property="og:description"
          content={`Welcome to the official website of Kirill Ateev, a contemporary artist known for his unique generative artworks. Explore his portfolio, exhibitions, community, and more.`}
        />
        <meta
          property="og:image"
          content="https://www.kirillateev.art/favicon.ico"
        />
        <meta property="og:image:alt" content={`Kirill Ateev's artwork`} />
        <meta property="og:site_name" content={`Kirill Ateev`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.kirillateev.art/" />
        <meta property="twitter:title" content={`Kirill Ateev - Artist`} />
        <meta
          property="twitter:description"
          content={`Welcome to the official website of Kirill Ateev, a contemporary artist known for his unique generative artworks. Explore his portfolio, exhibitions, community, and more.`}
        />
        <meta
          property="twitter:image"
          content="https://www.kirillateev.art/favicon.ico"
        />
        <meta property="twitter:image:alt" content={`Kirill Ateev's artwork`} />

        {/* Additional Meta Tags */}
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
