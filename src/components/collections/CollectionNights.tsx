'use client';
import { basePath } from '@/constants';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Trans } from '@lingui/macro';
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
        // touchEventsTarget="container"
        // touchMoveStopPropagation={true}
        modules={[A11y, FreeMode]}
      >
        <SwiperSlide className={styles.card_first}>
          <div>
            <span className="swiper-no-swiping">
              <div className={styles.title}>8 Nights</div>
            </span>
            <div className={styles.text_secondary}>
              <Trans>TON - Dec. 2023</Trans>
            </div>
          </div>
          <div className={styles.text_secondary}>
            <Trans>
              Compression-based generative multimedia collection. To play a
              melody - click over the piece.
            </Trans>
          </div>
          <div className={styles.text_secondary}>
            <Trans>Metadata and files stored on IPFS.</Trans>
          </div>
          <a
            className={`${styles.link} ${styles.text_secondary}`}
            target="_blank"
            rel="noreferrer"
            href="https://getgems.io/nights"
          >
            <Trans>View collection &gt;</Trans>
          </a>
        </SwiperSlide>
        {[65, 5, 79, 21, 1, 30].map((videoId, index) => (
          <SwiperSlide
            key={videoId}
            className={`${styles.card} ${styles.card_nights}`}
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              width={isXs || isSm ? '256' : '512'}
              height={isXs || isSm ? '256' : '512'}
              onMouseDown={(event) => (event.target as HTMLVideoElement).play()}
              onMouseUp={(event) => (event.target as HTMLVideoElement).pause()}
            >
              <source
                src={`${basePath}/videos/nights/${videoId}.mp4`}
                type="video/mp4"
              />
              <Trans>Your browser does not support the video tag.</Trans>
            </video>
          </SwiperSlide>
        ))}
        <SwiperSlide
          className={styles.container_arrow}
          style={{ height: isXs || isSm ? '256px' : '512px' }}
        >
          <ArrowRight href="https://getgems.io/nights" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
