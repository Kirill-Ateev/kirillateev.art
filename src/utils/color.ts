export function isLightColor(hex: string): boolean {
  const color = hex.replace('#', '');
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  // Формула для расчёта яркости
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  // Порог яркости
  return brightness > 200;
}
