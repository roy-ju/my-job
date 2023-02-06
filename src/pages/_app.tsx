import { AnimatedPanel } from '@/components/molecules';
import Router from '@/router';
import globals from '@/styles/globals';
import { cache } from '@emotion/css';
import { CacheProvider, Global } from '@emotion/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ParsedUrlQuery } from 'querystring';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { GlobalStyles as BaseStyles } from 'twin.macro';

export type NextPageWithLayout<P = { children?: ReactNode }, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (
    page: ReactNode,
    pageProps: any,
    prevPage?: ReactNode,
  ) => ReactNode;
  getComponent?: (pageProps: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const getComponent = Component.getComponent ?? ((p) => <Component {...p} />);

  return (
    <CacheProvider value={cache}>
      <BaseStyles />
      <Global styles={globals} />
      {/* Root Component */}
      <RecoilRoot>{getLayout(getComponent(pageProps), pageProps)}</RecoilRoot>
    </CacheProvider>
  );
}

export type PanelBasedPageProps = {
  depth: number;
  route: string;
  query: ParsedUrlQuery;
};

export function PanelBasedPage({ depth, route, query }: PanelBasedPageProps) {
  return (
    <AnimatedPanel width="375px" animationDuration={0.3}>
      <Router depth={depth} route={route} query={query} />
    </AnimatedPanel>
  );
}
