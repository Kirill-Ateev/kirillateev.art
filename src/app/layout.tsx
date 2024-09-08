import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <title>Kirill Ateev - Artist</title>
        <meta name="title" content="Kirill Ateev - Artist" />
        <meta
          name="description"
          content="Welcome to the official website of Kirill Ateev, a contemporary artist known for his unique and captivating artworks. Explore his portfolio, exhibitions, community, and more."
        />
        <meta
          name="keywords"
          content="Kirill Ateev, artist, contemporary art, generative, community, exhibitions, portfolio"
        />
        <meta name="author" content="Kirill Ateev" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ateev.art/" />
        <meta property="og:title" content="Kirill Ateev - Artist" />
        <meta
          property="og:description"
          content="Welcome to the official website of Kirill Ateev, a contemporary artist known for his unique and captivating artworks. Explore his portfolio, exhibitions, community, and more."
        />
        <meta
          property="og:image"
          content="https://www.ateev.art/images/icon.png"
        />
        <meta property="og:image:alt" content="Kirill Ateev's artwork" />
        <meta property="og:site_name" content="Kirill Ateev" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.ateev.art/" />
        <meta property="twitter:title" content="Kirill Ateev - Artist" />
        <meta
          property="twitter:description"
          content="Welcome to the official website of Kirill Ateev, a contemporary artist known for his unique and captivating artworks. Explore his portfolio, exhibitions, and more."
        />
        <meta
          property="twitter:image"
          content="https://www.ateev.art/images/icon.png"
        />
        <meta property="twitter:image:alt" content="Kirill Ateev's artwork" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
