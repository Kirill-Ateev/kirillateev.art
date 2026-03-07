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

export default function CollectionSelection() {
  const { i18n } = useLingui();

  // Инициализируем embla-carousel с опциями "dragFree" (свободное перетаскивание)
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const images = ['Egg'];

  return (
    <section>
      <div className={styles.embla} ref={emblaRef}>
        <div className={`draggable ${styles.embla__container}`}>
          <div className={`${styles.embla__slide} ${styles.card_first}`}>
            <div>
              <span className="embla-no-drag">
                <div className={styles.title}>Selection</div>
              </span>
              <div className={styles.text_secondary}>
                <Trans>Ethereum - March 2026</Trans>
              </div>
              <div className={styles.text_secondary}>
                <Trans>1 works</Trans>
              </div>
            </div>
            <div className={styles.text_secondary}>
              <Trans>
                A special selection. Individual works, triptychs, and small
                series curated just for you.
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
              href={`/${i18n.locale}/view/selection?item=${getRandomFromRange(
                collectionsData['selection'].minIndex,
                collectionsData['selection'].maxIndex,
              )}`}
            >
              <Trans>View collection &gt;</Trans>
            </Link>
            <Link
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href={collectionsData['selection'].marketplaces.rarible.link}
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
                src={`${basePath}/images/selection/${imageId}.svg`}
                alt={`Selection #${imageId} by Kirill Ateev`}
                width={512}
                height={512}
              />
              <div className={`${styles.text_secondary} ${styles.item_title}`}>
                {imageId}
              </div>
            </div>
          ))}

          <div className={`${styles.embla__slide} ${styles.container_arrow}`}>
            <ArrowRight
              href={collectionsData['selection'].marketplaces.rarible.link}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
