import { getI18nInstance } from '@/appRouterI18n';
import { redirect } from 'next/navigation';
import { locales } from '../../../lingui.config';

export default function Home() {
  const userLocale =
    typeof window !== 'undefined' ? navigator.language.split('-')[0] : 'en';
  const localeToRedirect = locales.includes(userLocale) ? userLocale : 'en';
  const i18n = getI18nInstance(localeToRedirect);
  redirect(`/en`);
}
