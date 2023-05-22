import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import GlobalStyles from '@/styles/GlobalStyles';
import SWRConfig from '@/lib/swr';
import Script from 'next/script';
import { initializeKakaoSDK } from '@/lib/kakao';

import OverlayContainer from '@/components/molecules/FullScreenDialog';
import { updateVH } from '@/utils/updateVH';
import ToastContainer from '@/lib/react-toastify';
import { useNativeAppEventListeners, usePageLoading, usePlatform } from '@/hooks/utils';
import Head from 'next/head';
import AppConfig from '@/config';
import NegocioProvider from '@/providers/NegocioProvider';
import TooltipProvider from '@/providers/TooltipProvider';
import ErrorBoundary from '@/providers/ErrorBoundary';
import { initializeAppleAuth } from '@/lib/apple';

export type NextPageWithLayout<P = { children?: ReactNode }, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactNode, pageProps: any, prevPage?: ReactNode) => ReactNode;
  getComponent?: (pageProps: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

updateVH();

if (typeof window !== 'undefined') {
  window.addEventListener('resize', updateVH);
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const getComponent = Component.getComponent ?? ((p) => <Component {...p} />);

  const platform = usePlatform();

  usePageLoading();
  useNativeAppEventListeners();

  return (
    <>
      <Head>
        <title>{AppConfig.title}</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1" />
      </Head>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous"
        onLoad={initializeKakaoSDK}
      />
      <Script
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        onLoad={initializeAppleAuth}
      />
      <CacheProvider value={cache}>
        <GlobalStyles />
        <RecoilRoot>
          <SWRConfig>
            <OverlayContainer />
            <div id="rootOverlay" tw="pointer-events-none [z-index: 1500]" />
            <ErrorBoundary>
              <NegocioProvider>{getLayout(getComponent(pageProps), pageProps)}</NegocioProvider>
            </ErrorBoundary>
            <ToastContainer platform={platform} />
            <TooltipProvider />
          </SWRConfig>
        </RecoilRoot>
      </CacheProvider>
    </>
  );
}
