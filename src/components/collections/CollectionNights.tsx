'use client';
import { basePath } from '@/constants';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/free-mode';
import { A11y, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArrowRight from '../common/ArrowRight';
import styles from './styles.module.css';

export default function CollectionNights() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { isXs, isSm } = useBreakpoints();

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.volume = 0.015;
      }
    });
  });

  return (
    <section>
      <Swiper
        className={styles.container}
        observer={true}
        observeParents={true}
        grabCursor={true}
        freeMode={true}
        slidesPerView="auto"
        modules={[A11y, FreeMode]}
      >
        <SwiperSlide className={styles.firstCard}>
          <span className="swiper-no-swiping">
            <div className={styles.title}>8 Nights</div>
          </span>
          <div className={styles.secondaryText}>TON - Dec. 2023</div>
          <div className={styles.secondaryText}>
            Compression-based generative multimedia collection. To play a melody
            - hover your mouse over the piece.
          </div>
          <div className={styles.secondaryText}>
            Metadata and files stored on IPFS.
          </div>
          <a
            className={`${styles.link} ${styles.secondaryText}`}
            target="_blank"
            rel="noreferrer"
            href="https://getgems.io/nights"
          >
            View collection &gt;
          </a>
        </SwiperSlide>
        {[65, 5, 79, 21, 1, 30].map((videoId, index) => (
          <SwiperSlide key={videoId} className={styles.cardNights}>
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              width={isXs || isSm ? '256' : '512'}
              height={isXs || isSm ? '256' : '512'}
              onMouseOver={(event) => (event.target as HTMLVideoElement).play()}
              onMouseOut={(event) => (event.target as HTMLVideoElement).pause()}
            >
              <source
                src={`${basePath}/videos/nights/${videoId}.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </SwiperSlide>
        ))}
        <SwiperSlide
          className={styles.arrowRightContainer}
          style={{ height: isXs || isSm ? '256px' : '512px' }}
        >
          <ArrowRight href="https://getgems.io/nights" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
