import Header from '@/components/header/Header';
import { messagesList } from '@/constants/text';
import { withLinguiPage } from '@/withLingui';
import { Trans } from '@lingui/react/macro';
import { locales } from '../../../../../lingui.config';
import styles from '../../page.module.css';

export async function generateStaticParams() {
  const paths: { message: string; lang: string }[] = [];
  Object.values(messagesList).forEach((message) => {
    locales.forEach((lang) => {
      paths.push({
        message: message.key,
        lang,
      });
    });
  });

  return paths;
}

export default withLinguiPage(async function Message({
  params,
}: {
  params: Promise<{ lang: string; message: keyof typeof messagesList }>;
}) {
  const { message } = await params;
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.subtitle}>
            <Trans>{messagesList[message].title}</Trans>
          </div>
          <div className={styles.text_secondary}>
            {messagesList[message].text}
          </div>
        </section>
      </main>
    </div>
  );
});
