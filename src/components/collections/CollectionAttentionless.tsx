'use client';
import { basePath } from '@/constants';
import { collectionsData } from '@/constants/collections';
import { getRandomFromRange } from '@/utils/numbers';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowRight from '../common/ArrowRight';
import styles from './styles.module.css';

export default function CollectionAttentionless() {
  const { i18n } = useLingui();
  // Инициализируем embla-carousel с опциями "dragFree" (свободное перетаскивание)
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const images = [533, 138, 109, 71, 349, 727];

  return (
    <section>
      <div className={styles.embla} ref={emblaRef}>
        <div className={`draggable ${styles.embla__container}`}>
          <div className={`${styles.embla__slide} ${styles.card_first}`}>
            <div>
              <span className="embla-no-drag">
                <div className={styles.title}>Attentionless</div>
              </span>
              <div className={styles.text_secondary}>
                <Trans>Ethereum - March 2025</Trans>
              </div>
              <div className={styles.text_secondary}>
                <Trans>1024 works</Trans>
              </div>
            </div>
            <div className={styles.text_secondary}>
              <Trans>
                A collection of generative collages of CC0 images in an
                abstractionist style.
              </Trans>
            </div>
            <div className={styles.text_secondary}>
              <Trans>Metadata and files stored on IPFS.</Trans>
            </div>
            {/* <Link
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Kirill-Ateev/attentionless"
            >
              <Trans>Source code &gt;</Trans>
            </Link> */}
            <Link
              suppressHydrationWarning
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href={`${
                i18n.locale
              }/view/attentionless?item=${getRandomFromRange(
                collectionsData.attentionless.minIndex,
                collectionsData.attentionless.maxIndex
              )}`}
            >
              <Trans>View collection &gt;</Trans>
            </Link>
            <Link
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href={collectionsData.attentionless.marketplaces.rarible.link}
            >
              Rarible &gt;
            </Link>
          </div>

          {images.map((imageId) => (
            <div
              key={imageId}
              className={`${styles.embla__slide} ${styles.card} ${styles.card_attentionless}`}
            >
              <Image
                src={`${basePath}/images/attentionless/${imageId}.webp`}
                alt={`Attentionless №${imageId}`}
                width={512}
                height={512}
              />
            </div>
          ))}

          <div className={`${styles.embla__slide} ${styles.container_arrow}`}>
            <ArrowRight
              href={collectionsData.attentionless.marketplaces.rarible.link}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
