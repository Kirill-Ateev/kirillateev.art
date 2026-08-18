import { SkeletonText } from './SkeletonText';
import styles from './styles.module.css';

export function SkeletonHeader({ className }: { className?: string }) {
  return (
    <div className={className ?? styles.header}>
      <SkeletonText width="220px" height="24px" />
    </div>
  );
}
