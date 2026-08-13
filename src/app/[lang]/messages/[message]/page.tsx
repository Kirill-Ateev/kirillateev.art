import Header from '@/components/header/Header';
import { LangAlternates } from '@/components/seo/LangAlternates';
import { messagesList } from '@/constants/text';
import { withLinguiPage } from '@/withLingui';
import type { Metadata } from 'next';
import { locales } from '../../../../../lingui.config';
import styles from '../../page.module.css';

const siteNames: Record<string, string> = {
  en: 'Kirill Ateev',
  ru: 'Кирилл Атеев',
};

function excerpt(text: string): string {
  return text.replace(/\s+/g, ' ').trim().slice(0, 155);
}

export async function generateStaticParams() {
  const paths: { message: string; lang: string }[] = [];
  Object.values(messagesList).forEach((message) => {
    locales.forEach((lang) => {
      paths.push({
        message: message[lang].key,
        lang,
      });
    });
  });

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; message: string }>;
}): Promise<Metadata> {
  const { lang, message } = await params;
  const msg = messagesList[message]?.[lang];
  const siteName = siteNames[lang] || siteNames.en;
  const title = msg
    ? `${msg.title} — ${siteName}`
    : `Messages — ${siteName}`;
  const description = msg ? excerpt(msg.text) : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `https://kirillateev.art/${lang}/messages/${message}`,
    },
    openGraph: {
      title,
      description,
      url: `https://kirillateev.art/${lang}/messages/${message}`,
      images: [
        {
          url: '/og/home.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/home.png'],
    },
  };
}

export default withLinguiPage(async function Message({
  params,
}: {
  params: Promise<{ lang: string; message: keyof typeof messagesList }>;
}) {
  const { lang, message } = await params;
  const msg = messagesList[message]?.[lang];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: msg?.title,
    description: msg ? excerpt(msg.text) : undefined,
    inLanguage: lang,
    author: {
      '@type': 'Person',
      name: siteNames[lang] || siteNames.en,
      url: 'https://kirillateev.art',
    },
    url: `https://kirillateev.art/${lang}/messages/${message}`,
  };

  return (
    <div>
      {msg && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <LangAlternates path={`/messages/${message}`} />
      <Header />
      <main className={styles.main}>
        <section className={`${styles.container} ${styles.container_message}`}>
          <div className={styles.message}>
            <h1 className={styles.subtitle}>{msg?.title}</h1>
            <div className={styles.text_secondary}>{msg?.text}</div>
          </div>
        </section>
      </main>
    </div>
  );
});
