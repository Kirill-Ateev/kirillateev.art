import styles from './styles.module.css';

export function SkeletonText({
  width,
  height = '0.85em',
  className,
}: {
  width?: string | number;
  height?: string | number;
  className?: string;
}) {
  return (
    <span
      className={`${styles.skeleton} ${styles.skeleton_text} ${className ?? ''}`}
      style={{ width, height }}
    />
  );
}
