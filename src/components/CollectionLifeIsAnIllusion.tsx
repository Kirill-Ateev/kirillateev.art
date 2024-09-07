'use client';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/free-mode';
import { A11y, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArrowRight from './common/ArrowRight';
import styles from './styles.module.css';

export default function CollectionLifeIsAnIllusion() {
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
          <div className={styles.title}>Life is an illusion</div>
          <div className={styles.secondaryText}>Ethereum - Jun. 2023</div>
          <div className={styles.secondaryText}>
            A unique collection of 42 impressionist photos from different parts
            of the world dedicated to Anna`s father. Each work contains 42
            copies.
          </div>
          <div className={styles.secondaryText}>
            Metadata and compressed images stored on-chain, additionally the
            original photos stored on IPFS.
          </div>
          <a
            className={`${styles.link} ${styles.secondaryText}`}
            target="_blank"
            rel="noreferrer"
            href="https://rarible.com/life-is-an-illusion"
          >
            View collection &gt;
          </a>
        </SwiperSlide>
        {[7, 9, 18, 13, 5, 17].map((imageId) => (
          <SwiperSlide key={imageId} className={styles.cardLIAL}>
            <Image
              src={`/images/lifeIsAnIllusion/${imageId}.webp`}
              alt={`Illusion %${imageId}`}
              width="555"
              height="784"
            />
          </SwiperSlide>
        ))}
        <SwiperSlide className={styles.arrowRightContainer}>
          <ArrowRight />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
