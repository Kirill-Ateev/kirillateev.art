// components/LazyHydrate.tsx
'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

interface LazyHydrateProps {
  children: ReactNode;
  // Высота теперь ОБЯЗАТЕЛЬНА. Это контракт, который мы заключаем с браузером.
  placeholderHeight: string | number;
}

export default function LazyHydrate({
  children,
  placeholderHeight,
}: LazyHydrateProps) {
  const [isIntersected, setIsIntersected] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Если JS отключен или нет поддержки Observer, React на клиенте ничего не сделает,
    // и пользователь увидит серверную HTML-версию. Это нормально.
    if (typeof window.IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ minHeight: placeholderHeight }}
      suppressHydrationWarning
    >
      {isIntersected ? (
        <div className={styles.contentVisible}>{children}</div>
      ) : null}
    </div>
  );
}
