import { SkeletonText } from './SkeletonText';
import styles from './styles.module.css';

export function SkeletonAttribute({ className }: { className?: string }) {
  return (
    <div className={className ?? styles.attribute}>
      <div className={styles.skeleton_attribute_head}>
        <SkeletonText width="100px" height="12px" />
        <SkeletonText width="60px" height="12px" />
      </div>
    </div>
  );
}
