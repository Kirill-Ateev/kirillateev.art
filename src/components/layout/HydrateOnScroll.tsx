'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

interface LazyHydrateAndAnimateProps {
  children: ReactNode;
  // Важно передавать точную высоту плейсхолдера, чтобы избежать CLS
  placeholderHeight: string | number;
}

export default function LazyHydrate({
  children,
  placeholderHeight,
}: LazyHydrateAndAnimateProps) {
  const [isIntersected, setIsIntersected] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window.IntersectionObserver === 'undefined') {
      setIsIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      {
        // Начинаем загрузку за 50px до появления во вьюпорте
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${isIntersected ? styles.visible : ''}`}
      style={{ minHeight: placeholderHeight }}
      //   suppressHydrationWarning
    >
      {isIntersected ? children : null}
    </div>
  );
}
