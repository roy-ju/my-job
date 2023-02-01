import { Panel } from '@/components/atoms';
import Router from '@/router';
import '@/styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ParsedUrlQuery } from 'querystring';
import type { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

export type NextPageWithLayout<P = { children?: ReactNode }, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (
    page: ReactElement,
    pageProps: any,
    prevPage?: ReactElement,
  ) => ReactNode;
  getComponent?: (pageProps: any) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const getComponent = Component.getComponent ?? ((p) => <Component {...p} />);

  return (
    <RecoilRoot>{getLayout(getComponent(pageProps), pageProps)}</RecoilRoot>
  );
}

export type PanelBasedPageProps = {
  depth: number;
  route: string;
  query: ParsedUrlQuery;
};

export function PanelBasedPage({ depth, route, query }: PanelBasedPageProps) {
  return (
    <>
      <Panel>
        <Router depth={depth} route={route} query={query} />
      </Panel>
    </>
  );
}
