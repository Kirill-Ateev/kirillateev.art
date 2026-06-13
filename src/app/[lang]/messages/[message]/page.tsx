import Header from '@/components/header/Header';
import { messagesList } from '@/constants/text';
import { withLinguiPage } from '@/withLingui';
import { Trans, useLingui } from '@lingui/react/macro';
import type { Metadata } from 'next';
import { locales } from '../../../../../lingui.config';
import styles from '../../page.module.css';

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
  const title = msg ? `${msg.title} — Kirill Ateev` : 'Messages — Kirill Ateev';

  return {
    title,
    alternates: {
      canonical: `https://kirillateev.art/${lang}/messages/${message}`,
    },
    openGraph: {
      title,
      url: `https://kirillateev.art/${lang}/messages/${message}`,
    },
  };
}

export default withLinguiPage(async function Message({
  params,
}: {
  params: Promise<{ lang: string; message: keyof typeof messagesList }>;
}) {
  const { i18n } = useLingui();
  const { message } = await params;
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <section className={`${styles.container} ${styles.container_message}`}>
          <div className={styles.message}>
            <div className={styles.subtitle}>
              <Trans>{messagesList[message]?.[i18n.locale].title}</Trans>
            </div>
            <div className={styles.text_secondary}>
              {messagesList[message]?.[i18n.locale].text}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});
