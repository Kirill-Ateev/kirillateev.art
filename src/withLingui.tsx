import { setI18n } from '@lingui/react/server';
import { ReadonlyURLSearchParams } from 'next/navigation';
import React, { ReactNode } from 'react';
import { getI18nInstance } from './appRouterI18n';

export type PageLangParam = {
  params: Promise<{ lang: string }>;
};

type PageProps = PageLangParam & {
  searchParams?: Promise<ReadonlyURLSearchParams>; // in query
};

type LayoutProps = PageLangParam & {
  children: React.ReactNode;
};

type PageExposedToNextJS<Props extends PageProps> = (props: Props) => ReactNode;

export const withLinguiPage = <Props extends PageProps>(
  AppRouterPage: React.ComponentType<PageLangParam & Props>
): PageExposedToNextJS<Props> => {
  return async function WithLingui(props) {
    const { lang } = await props.params;
    const i18n = getI18nInstance(lang);
    setI18n(i18n);

    return <AppRouterPage {...props} lang={lang} />;
  };
};

type LayoutExposedToNextJS<Props extends LayoutProps> = (
  props: Props
) => ReactNode;

export const withLinguiLayout = <Props extends LayoutProps>(
  AppRouterPage: React.ComponentType<PageLangParam & Props>
): LayoutExposedToNextJS<Props> => {
  return async function WithLingui(props) {
    const { lang } = await props.params;
    const i18n = getI18nInstance(lang);
    setI18n(i18n);

    return <AppRouterPage {...props} lang={lang} />;
  };
};
