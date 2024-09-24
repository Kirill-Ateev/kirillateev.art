'use client';
import { basePath } from '@/constants';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Trans } from '@lingui/macro';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/free-mode';
import { A11y, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArrowRight from '../common/ArrowRight';
import styles from './styles.module.css';

export default function CollectionKindWords() {
  const { isXs, isSm } = useBreakpoints();

  return (
    <section>
      <Swiper
        className={styles.container}
        grabCursor={true}
        freeMode={true}
        slidesPerView="auto"
        modules={[A11y, FreeMode]}
      >
        <SwiperSlide className={styles.firstCard}>
          <div>
            <span className="swiper-no-swiping">
              <div className={styles.title}>Kind Words</div>
            </span>
            <div className={styles.secondaryText}>
              <Trans>Polygon - Feb. 2023</Trans>
            </div>
          </div>
          <div className={styles.secondaryText}>
            <Trans>
              A word-generative collection, a unique pattern of character states
              from{' '}
              <a
                className={`${styles.link} ${styles.secondaryText}`}
                target="_blank"
                rel="noreferrer"
                href="https://dobroshrift.ru/"
              >
                dobrofont
              </a>
              , a font drawn by special children.
            </Trans>
          </div>
          <div className={styles.secondaryText}>
            <Trans>Metadata and files stored on IPFS.</Trans>
          </div>
          <a
            className={`${styles.link} ${styles.secondaryText}`}
            target="_blank"
            rel="noreferrer"
            href="https://rarible.com/kindwords"
          >
            <Trans>View collection &gt;</Trans>
          </a>
        </SwiperSlide>
        {[284, 89, 200, 91, 259, 278].map((imageId) => (
          <SwiperSlide key={imageId} className={styles.cardKindWords}>
            <Image
              src={`${basePath}/images/kindWords/${imageId}.png`}
              alt={`Kind Words №${imageId}`}
              width={isXs || isSm ? '256' : '512'}
              height={isXs || isSm ? '256' : '512'}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide
          className={styles.arrowRightContainer}
          style={{ height: isXs || isSm ? '256px' : '512px' }}
        >
          <ArrowRight href="https://rarible.com/kindwords" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
