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

export default function CollectionFolds() {
  const { i18n } = useLingui();

  // Инициализируем embla-carousel с опциями "dragFree" (свободное перетаскивание)
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const images = [
    'image-174',
    'image-223',
    'image-416',
    'image-341',
    'image-359',
    'image-407',
  ];

  return (
    <section>
      <div className={styles.embla} ref={emblaRef}>
        <div className={`draggable ${styles.embla__container}`}>
          <div className={`${styles.embla__slide} ${styles.card_first}`}>
            <div>
              <span className="embla-no-drag">
                <div className={styles.title}>Folds</div>
              </span>
              <div className={styles.text_secondary}>
                <Trans>Ethereum - January 2026</Trans>
              </div>
              <div className={styles.text_secondary}>
                <Trans>512 works</Trans>
              </div>
            </div>
            <div className={styles.text_secondary}>
              <Trans>
                A collection of animated vector images in kinetic minimalism
                style (kinimalism).
              </Trans>
            </div>
            <div className={styles.text_secondary}>
              <Trans>
                Images and metadata stored directly on blockchain (on-chain).
              </Trans>
            </div>
            <Link
              suppressHydrationWarning
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href={`${i18n.locale}/view/folds?item=${getRandomFromRange(
                collectionsData['folds'].minIndex,
                collectionsData['folds'].maxIndex,
              )}`}
            >
              <Trans>View collection &gt;</Trans>
            </Link>
            <Link
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href={collectionsData['folds'].marketplaces.rarible.link}
            >
              Rarible &gt;
            </Link>
          </div>

          {images.map((imageId) => (
            <div
              key={imageId}
              className={`${styles.embla__slide} ${styles.card} ${styles.card_nights}`}
            >
              <Image
                src={`${basePath}/images/folds/${imageId}.svg`}
                alt={`folds #${imageId}`}
                width={512}
                height={512}
              />
            </div>
          ))}

          <div className={`${styles.embla__slide} ${styles.container_arrow}`}>
            <ArrowRight
              href={collectionsData['folds'].marketplaces.rarible.link}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
