export const SITE = 'https://kirillateev.art';

export const siteNames = {
  en: 'Kirill Ateev',
  ru: 'Кирилл Атеев',
  zh: 'Kirill Ateev',
  hi: 'Kirill Ateev',
  es: 'Kirill Ateev',
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
  zh: 'Kirill Ateev — 艺术家',
  hi: 'Kirill Ateev — कलाकार',
  es: 'Kirill Ateev — Artista',
} as const;

export const homepageDescriptions = {
  en: 'Welcome to the official website of Kirill Ateev, a contemporary artist known for his unique generative artworks. Explore his portfolio, exhibitions, community, and more.',
  ru: 'Добро пожаловать на официальный сайт Кирилла Атеева, современного художника, известного своими уникальными генеративными произведениями. Изучите его портфолио, выставки, сообщество и многое другое.',
  zh: '欢迎访问 Kirill Ateev 的官方网站，他是一位以独特生成艺术作品闻名的当代艺术家。探索他的作品集、展览、社区等更多内容。',
  hi: 'Kirill Ateev की आधिकारिक वेबसाइट पर आपका स्वागत है। वे एक समकालीन कलाकार हैं जो अपनी अद्वितीय जनरेटिव कलाकृतियों के लिए जाने जाते हैं। उनके पोर्टफोलियो, प्रदर्शनियों, समुदाय और बहुत कुछ देखें।',
  es: 'Bienvenido al sitio web oficial de Kirill Ateev, un artista contemporáneo conocido por sus obras de arte generativo únicas. Explora su portafolio, exposiciones, comunidad y más.',
} as const;
export function homepageTitle(lang: string): string {
  return (
    homepageTitles[lang as keyof typeof homepageTitles] ?? homepageTitles.en
  );
}

export function homepageDescription(lang: string): string {
  return (
    homepageDescriptions[lang as keyof typeof homepageDescriptions] ??
    homepageDescriptions.en
  );
}
