import Header from '@/components/header/Header';
import { LangAlternates } from '@/components/seo/LangAlternates';
import { messagesList } from '@/constants/text';
import { withLinguiPage } from '@/withLingui';
import { Trans, useLingui } from '@lingui/react/macro';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../page.module.css';

const titles: Record<string, string> = {
  en: 'Messages — Kirill Ateev',
  ru: 'Сообщения — Кирилл Атеев',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: titles[lang] || titles.en,
    alternates: {
      canonical: `https://kirillateev.art/${lang}/messages`,
    },
    openGraph: {
      title: titles[lang] || titles.en,
      url: `https://kirillateev.art/${lang}/messages`,
      images: [
        {
          url: '/og/home.png',
          width: 1200,
          height: 630,
          alt: 'Messages — Kirill Ateev',
        },
      ],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default withLinguiPage(function Messages() {
  const { i18n } = useLingui();
  return (
    <div>
      <LangAlternates path="/messages" />
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <h1 className={styles.subtitle}>
            <Trans>Messages</Trans>
          </h1>
          <div className={styles.text_secondary}>
            <Trans>Some messages for you</Trans>
          </div>
        </section>
        {Object.values(messagesList).map((message) => {
          return (
            <section
              key={message?.[i18n.locale].key}
              className={styles.container_message}
            >
              <div className={styles.message}>
                <Link
                  className={styles.menu_item}
                  href={`/${i18n.locale}/messages/${
                    message?.[i18n.locale].key
                  }`}
                >
                  <h2 className={styles.subtitle}>
                    <Trans id={message?.[i18n.locale].title}>
                      {message?.[i18n.locale].title}
                    </Trans>
                  </h2>
                </Link>
                <div className={styles.text_secondary}>
                  <Trans id={message?.[i18n.locale].text}>
                    {message?.[i18n.locale].text}
                  </Trans>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
});
