import { setI18n } from '@lingui/react/server';
import { ReadonlyURLSearchParams } from 'next/navigation';
import React, { ReactNode } from 'react';
import { getI18nInstance } from './appRouterI18n';

export type PageLangParam = {
  params: { lang: string };
};

type PageProps = PageLangParam & {
  searchParams?: ReadonlyURLSearchParams; // in query
};

type LayoutProps = PageLangParam & {
  children: React.ReactNode;
};

type PageExposedToNextJS<Props extends PageProps> = (props: Props) => ReactNode;

export const withLinguiPage = <Props extends PageProps>(
  AppRouterPage: React.ComponentType<PageLangParam & Props>
): PageExposedToNextJS<Props> => {
  return function WithLingui(props) {
    const lang = props.params.lang;
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
  return function WithLingui(props) {
    const lang = props.params.lang;
    const i18n = getI18nInstance(lang);
    setI18n(i18n);

    return <AppRouterPage {...props} lang={lang} />;
  };
};
