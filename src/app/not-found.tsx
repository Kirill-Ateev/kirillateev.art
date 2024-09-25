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
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Z42GJN0HP7"
        ></script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z42GJN0HP7');`}
        </script>
      </head>
      <body className={nunito.variable}>
        <div className="errorContainer">
          <img
            src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
            alt="404"
          />
          <div className={styles.title}>Not found – 404</div>
          <div className={styles.menuItem}>
            <Link href="/en">Go back</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
