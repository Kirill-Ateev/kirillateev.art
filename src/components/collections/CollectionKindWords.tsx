'use client';
import { useBreakpoints } from '@/hooks/useBreakpoints';
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
          <span className="swiper-no-swiping">
            <div className={styles.title}>Kind Words</div>
          </span>
          <div className={styles.secondaryText}>Polygon - Feb. 2023</div>
          <div className={styles.secondaryText}>
            A word-generative collection, a unique pattern of character states
            from dobrofont, a font drawn by special children.
          </div>
          <div className={styles.secondaryText}>
            Metadata and files stored on IPFS.
          </div>
          <a
            className={`${styles.link} ${styles.secondaryText}`}
            target="_blank"
            rel="noreferrer"
            href="https://rarible.com/kindwords"
          >
            View collection &gt;
          </a>
        </SwiperSlide>
        {[284, 89, 200, 91, 259, 278].map((imageId) => (
          <SwiperSlide key={imageId} className={styles.cardKindWords}>
            <Image
              src={`/images/kindWords/${imageId}.png`}
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
