export const SITE = 'https://kirillateev.art';

export const siteNames = {
  en: 'Kirill Ateev',
  ru: 'Кирилл Атеев',
} as const;

export function siteName(lang: string): string {
  return siteNames[lang as keyof typeof siteNames] ?? siteNames.en;
}

export function siteUrl(path = ''): string {
  return `${SITE}${path}`;
}

export function langUrl(lang: string, path = ''): string {
  return siteUrl(`/${lang}${path}`);
}

export const homepageTitles = {
  en: 'Kirill Ateev - Artist',
  ru: 'Кирилл Атеев — Художник',
} as const;

export const homepageDescriptions = {
  en: 'Welcome to the official website of Kirill Ateev, a contemporary artist known for his unique generative artworks. Explore his portfolio, exhibitions, community, and more.',
  ru: 'Добро пожаловать на официальный сайт Кирилла Атеева, современного художника, известного своими уникальными генеративными произведениями.',
} as const;

export function homepageTitle(lang: string): string {
  return homepageTitles[lang as keyof typeof homepageTitles] ?? homepageTitles.en;
}

export function homepageDescription(lang: string): string {
  return (
    homepageDescriptions[lang as keyof typeof homepageDescriptions] ??
    homepageDescriptions.en
  );
}