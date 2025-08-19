'use client';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Trans } from '@lingui/react/macro';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import ArrowRight from '../common/ArrowRight';
import styles from './styles.module.css';

export default function CollectionNights() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { isXs, isSm } = useBreakpoints();

  // Устанавливаем громкость для всех видео при маунте
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.volume = 0.015;
        video.load();
        video.setAttribute('data-loaded', 'true');
      }
    });
  }, []);

  // Инициализируем embla-carousel с опциями dragFree и ограничением прокрутки
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const videos = [65, 5, 79, 21, 1, 30];

  return (
    <section>
      <div className={styles.embla} ref={emblaRef}>
        <div className={`draggable ${styles.embla__container}`}>
          <div className={`${styles.embla__slide} ${styles.card_first}`}>
            <div>
              <span className="embla-no-drag">
                <div className={styles.title}>8 Nights</div>
              </span>
              <div className={styles.text_secondary}>
                <Trans>TON - Dec. 2023</Trans>
              </div>
              <div className={styles.text_secondary}>
                <Trans>88 works</Trans>
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
            <Link
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Kirill-Ateev/8-nights"
            >
              <Trans>Source code &gt;</Trans>
            </Link>
            <Link
              className={`${styles.link} ${styles.text_secondary}`}
              target="_blank"
              rel="noreferrer"
              href="https://getgems.io/nights"
            >
              <Trans>View collection &gt;</Trans>
            </Link>
          </div>

          {videos.map((videoId, index) => (
            <div
              key={videoId}
              className={`${styles.embla__slide} ${styles.card} ${styles.card_nights}`}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                poster={`https://cdn.jsdelivr.net/gh/Kirill-Ateev/8-nights@master/videoScreens/${videoId}.png`}
                width={isXs || isSm ? 300 : 512}
                height={isXs || isSm ? 300 : 512}
                playsInline
                onTouchStart={(event) =>
                  (event.target as HTMLVideoElement).play()
                }
                onMouseDown={(event) =>
                  (event.target as HTMLVideoElement).play()
                }
                onTouchEnd={(event) =>
                  (event.target as HTMLVideoElement).pause()
                }
                onMouseUp={(event) =>
                  (event.target as HTMLVideoElement).pause()
                }
                preload="auto"
              >
                <source
                  src={`https://cdn.jsdelivr.net/gh/Kirill-Ateev/ateev.art@main/public/videos/nights/${videoId}.webm`}
                  type="video/webm"
                />
                <source
                  src={`https://cdn.jsdelivr.net/gh/Kirill-Ateev/8-nights@master/video/${videoId}.mp4`}
                  type="video/mp4"
                />
                <Trans>Your browser does not support the video tag.</Trans>
              </video>
            </div>
          ))}

          <div
            className={`${styles.embla__slide} ${styles.container_arrow}`}
            style={{ height: isXs || isSm ? '300px' : '512px' }}
          >
            <ArrowRight href="https://getgems.io/nights" />
          </div>
        </div>
      </div>
    </section>
  );
}
