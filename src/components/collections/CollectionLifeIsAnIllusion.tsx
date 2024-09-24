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

export default function CollectionLifeIsAnIllusion() {
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
              <div className={styles.title}>Life is an illusion</div>
            </span>
            <div className={styles.secondaryText}>
              <Trans>Ethereum - Jun. 2023</Trans>
            </div>
          </div>
          <div className={styles.secondaryText}>
            <Trans>
              A unique collection of 42 impressionist photos from different
              parts of the world dedicated to Anna`s father. Each work contains
              42 copies.
            </Trans>
          </div>
          <div className={styles.secondaryText}>
            <Trans>
              Metadata and compressed images stored on-chain, additionally the
              original photos stored on IPFS.
            </Trans>
          </div>
          <a
            className={`${styles.link} ${styles.secondaryText}`}
            target="_blank"
            rel="noreferrer"
            href="https://rarible.com/life-is-an-illusion"
          >
            <Trans>View collection &gt;</Trans>
          </a>
        </SwiperSlide>
        {[7, 9, 18, 13, 5, 17].map((imageId) => (
          <SwiperSlide key={imageId} className={styles.cardLIAL}>
            <Image
              src={`${basePath}/images/lifeIsAnIllusion/${imageId}.webp`}
              alt={`Illusion %${imageId}`}
              width={isXs || isSm ? '277' : '555'}
              height={isXs || isSm ? '392' : '784'}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide
          className={styles.arrowRightContainer}
          style={{ height: isXs || isSm ? '392px' : '784px' }}
        >
          <ArrowRight href="https://rarible.com/life-is-an-illusion" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
