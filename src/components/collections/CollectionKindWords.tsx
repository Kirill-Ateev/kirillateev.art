'use client';
import { basePath } from '@/constants';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Trans } from '@lingui/macro';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import ArrowRight from '../common/ArrowRight';
import styles from './styles.module.css';

export default function CollectionKindWords() {
  const { isXs, isSm } = useBreakpoints();

  // Инициализируем embla-carousel с опциями "dragFree" (свободное перетаскивание)
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const images = [284, 89, 200, 91, 259, 278];

  return (
    <section>
      <div className={styles.embla} ref={emblaRef}>
        <div className={`draggable ${styles.embla__container}`}>
          <div className={`${styles.embla__slide} ${styles.card_first}`}>
            <div>
              <span className="embla-no-drag">
                <div className={styles.title}>Kind Words</div>
              </span>
              <div className={styles.text_secondary}>
                <Trans>Polygon - Feb. 2023</Trans>
              </div>
              <div className={styles.text_secondary}>
                <Trans>300 works</Trans>
              </div>
            </div>
            <div className={styles.text_secondary}>
              <Trans>
                A word-generative collection, a unique pattern of character
                states from{' '}
                <a
                  className={`${styles.link} ${styles.text_secondary}`}
                  target="_blank"
                  rel="noreferrer"
                  href="https://dobroshrift.ru/"
                >
                  dobrofont
                </a>
                , a font drawn by special children.
              </Trans>
            </div>
            <div className={styles.text_secondary}>
              <Trans>Metadata and files stored on IPFS.</Trans>
            </div>
            <a
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Kirill-Ateev/kind-words"
            >
              <Trans>Source code &gt;</Trans>
            </a>
            <a
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://rarible.com/kindwords"
            >
              <Trans>View collection &gt;</Trans>
            </a>
          </div>

          {images.map((imageId) => (
            <div
              key={imageId}
              className={`${styles.embla__slide} ${styles.card} ${styles.card_kindwords}`}
            >
              <Image
                src={`${basePath}/images/kindWords/${imageId}.webp`}
                alt={`Kind Words №${imageId}`}
                width={isXs || isSm ? 300 : 512}
                height={isXs || isSm ? 300 : 512}
              />
            </div>
          ))}

          <div
            className={`${styles.embla__slide} ${styles.container_arrow}`}
            style={{ height: isXs || isSm ? '300px' : '512px' }}
          >
            <ArrowRight href="https://rarible.com/kindwords" />
          </div>
        </div>
      </div>
    </section>
  );
}
