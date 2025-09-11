'use client';
import { basePath } from '@/constants';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Trans } from '@lingui/react/macro';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowRight from '../common/ArrowRight';
import styles from './styles.module.css';

export default function CollectionLifeIsAnIllusion() {
  const { isXs, isSm } = useBreakpoints();

  // Инициализируем embla-carousel с опциями dragFree и ограничением прокрутки
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const images = [33, 7, 13, 5, 32, 35];

  return (
    <section>
      <div className={styles.embla} ref={emblaRef}>
        <div className={`draggable ${styles.embla__container}`}>
          {/* Первый слайд с текстовой информацией */}
          <div className={`${styles.embla__slide} ${styles.card_first}`}>
            <div>
              <span className="embla-no-drag">
                <div className={styles.title}>Life is an illusion</div>
              </span>
              <div className={styles.text_secondary}>
                <Trans>Ethereum - Jun. 2023</Trans>
              </div>
              <div className={styles.text_secondary}>
                <Trans>20 works</Trans>
              </div>
            </div>
            <div className={styles.text_secondary}>
              <Trans>A collection of 42 impressionist style photos.</Trans>
            </div>
            <div className={styles.text_secondary}>
              <Trans>
                Metadata and compressed images stored on-chain, additionally the
                original photos stored on IPFS.
              </Trans>
            </div>
            {/* <Link
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Kirill-Ateev/life-is-an-illusion"
            >
              <Trans>Source code &gt;</Trans>
            </Link> */}
            <Link
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://og.rarible.com/life-is-an-illusion"
            >
              <Trans>View collection &gt;</Trans>
            </Link>
          </div>

          {/* Слайды с изображениями */}
          {images.map((imageId) => (
            <div
              key={imageId}
              className={`${styles.embla__slide} ${styles.card} ${styles.card_liai}`}
            >
              <Image
                src={`${basePath}/images/lifeIsAnIllusion/${imageId}.webp`}
                alt={`Illusion %${imageId}`}
                width={isXs || isSm ? 277 : 555}
                height={isXs || isSm ? 392 : 784}
              />
            </div>
          ))}

          {/* Последний слайд с кнопкой-стрелкой */}
          <div
            className={`${styles.embla__slide} ${styles.container_arrow}`}
            style={{ height: isXs || isSm ? '392px' : '784px' }}
          >
            <ArrowRight href="https://og.rarible.com/life-is-an-illusion" />
          </div>
        </div>
      </div>
    </section>
  );
}
