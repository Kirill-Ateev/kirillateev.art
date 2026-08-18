import React from 'react';
import styles from './styles.module.css';

type SkeletonBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: string | number;
  height?: string | number;
};

export function SkeletonBox({
  width,
  height,
  className,
  ...props
}: SkeletonBoxProps) {
  return (
    <div
      className={`${styles.skeleton} ${className ?? ''}`}
      style={{ width, height }}
      {...props}
    />
  );
}
