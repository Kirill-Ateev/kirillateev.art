import Header from '@/components/header/Header';
import { messagesList } from '@/constants/text';
import { withLinguiPage } from '@/withLingui';
import { Trans, useLingui } from '@lingui/react/macro';
import Link from 'next/link';
import styles from '../page.module.css';

export default withLinguiPage(function Messages() {
  const { i18n } = useLingui();
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.subtitle}>
            <Trans>Messages</Trans>
          </div>
          <div className={styles.text_secondary}>
            <Trans>Some messages for you</Trans>
          </div>
        </section>
        {Object.values(messagesList).map((message) => {
          return (
            <section key={message.key} className={styles.container}>
              <Link
                className={styles.menu_item}
                href={`/${i18n.locale}/messages/${message.key}`}
              >
                <div className={styles.subtitle}>
                  <Trans>{message.title}</Trans>
                </div>
              </Link>
              <div className={styles.text_secondary}>
                <Trans>{message.text}</Trans>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
});
