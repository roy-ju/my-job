import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode, useEffect } from 'react';
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

import * as gtag from '@/lib/gtag';
import { useRouter } from 'next/router';
import AppVersionChecker from '@/providers/AppVersionChecker';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: '지역매물 추천 서비스',
      description: '원하는 지역의 원하는 매물을 추천 받아보세요.',
      url: 'https://www.negocio.co.kr/suggestRegionalForm',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 2,
      name: '지도 검색',
      description: '원하는 지역에 원하는 매물과 단지를 검색해 보세요.',
      url: 'https://www.negocio.co.kr/map',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 3,
      name: '집주인 매물등록',
      description: '소유하신 매물을 등록해 보세요.',
      url: 'https://www.negocio.co.kr/listingCreateAddress',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 4,
      name: '네고시오 가이드',
      description: '네고시오에 대한 궁금증은 이곳에서 해결하세요.',
      url: 'https://www.negocio.co.kr/intro',
    },
  ],
};

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

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>{AppConfig.title}</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1" />
        <meta name="naver-site-verification" content={`${process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      {/* Google Trends API */}
      {/* <Script
        strategy="afterInteractive"
        type="text/javascript"
        src="https://ssl.gstatic.com/trends_nrtr/3349_RC01/embed_loader.js"
      /> */}

      {/* Google Tag */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtag.GTM_ID}');
        `}
      </Script>

      {/* Kakao SDK */}
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous"
        onLoad={initializeKakaoSDK}
      />

      {/* Apple Auth */}
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
            <AppVersionChecker />
          </SWRConfig>
        </RecoilRoot>
      </CacheProvider>
    </>
  );
}
