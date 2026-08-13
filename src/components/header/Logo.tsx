'use client';
import { isLightColor } from '@/utils/color';
import { useCallback, useEffect, useState } from 'react';
import LogoIcon from '../../../public/icons/logo.svg';
import styles from './styles.module.css';

export default function Logo() {
  const [color, setColor] = useState<string>('#000000');

  const generateRandomColor = useCallback(() => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  }, []);

  // Рандомный цвет применяется только на клиенте после гидрации,
  // поэтому SSR и первый клиентский рендер совпадают (оба чёрные)
  useEffect(() => {
    setColor(generateRandomColor());
  }, [generateRandomColor]);

  const handleHover = () => {
    setColor(generateRandomColor());
  };

  // Если случайный цвет слишком светлый, делаем «белые» области чёрными
  const secondaryFill = isLightColor(color) ? '#000000' : '#ffffff';

  return (
    <LogoIcon
      className={styles.logo}
      onMouseEnter={handleHover}
      onMouseLeave={() => setColor('#000000')}
      style={{
        color: color,
        '--secondary-fill': secondaryFill,
      }}
      fill={color}
      alt="Kirill Ateev logo"
      width={30}
      height={30}
    />
  );
}
