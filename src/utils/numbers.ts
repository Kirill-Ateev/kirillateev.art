export const isNumeric = (value: string | null) => {
  if (value === null) return false;
  return /^-?\d+$/.test(value);
};

export const getRandomFromRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
