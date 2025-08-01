'use client';
import { basePath } from '@/constants';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Trans } from '@lingui/macro';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import ArrowRight from '../common/ArrowRight';
import styles from './styles.module.css';

export default function CollectionWindow() {
  const { isXs, isSm } = useBreakpoints();

  // Инициализируем embla-carousel с опциями "dragFree" (свободное перетаскивание)
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const images = [3024, 3016, 3171, 3182, 3744, 9995];

  return (
    <section>
      <div className={styles.embla} ref={emblaRef}>
        <div className={`draggable ${styles.embla__container}`}>
          <div className={`${styles.embla__slide} ${styles.card_first}`}>
            <div>
              <span className="embla-no-drag">
                <div className={styles.title}>Window</div>
              </span>
              <div className={styles.text_secondary}>
                <Trans>Ethereum - August 2025</Trans>
              </div>
              <div className={styles.text_secondary}>
                <Trans>10 000 works</Trans>
              </div>
            </div>
            <div className={styles.text_secondary}>
              <Trans>
                A collection of generative animated vector images in kinetic
                minimalism style.
              </Trans>
            </div>
            <div className={styles.text_secondary}>
              <Trans>
                Metadata and images stored directly on blockchain (on-chain).
              </Trans>
            </div>
            {/* <a
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Kirill-Ateev/attentionless"
            >
              <Trans>Source code &gt;</Trans>
            </a> */}
            <a
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://rarible.com/window-by-kirill-ateev"
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
                src={`${basePath}/images/window/${imageId}.svg`}
                alt={`window №${imageId}`}
                width={isXs || isSm ? 300 : 512}
                height={isXs || isSm ? 300 : 512}
              />
            </div>
          ))}

          <div
            className={`${styles.embla__slide} ${styles.container_arrow}`}
            style={{ height: isXs || isSm ? '300px' : '512px' }}
          >
            <ArrowRight href="https://rarible.com/window-by-kirill-ateev" />
          </div>
        </div>
      </div>
    </section>
  );
}
