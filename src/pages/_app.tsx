import { AnimatedPanel } from '@/components/molecules';
import { initializeKakaoSDK } from '@/lib/kakao';
import Router from '@/router';
import '@/styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ParsedUrlQuery } from 'querystring';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

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
    <>
      {/* 카카오 SDK CDN Script */}
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous"
        onLoad={initializeKakaoSDK}
      />
      {/* Root Component */}
      <RecoilRoot>{getLayout(getComponent(pageProps), pageProps)}</RecoilRoot>
    </>
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
