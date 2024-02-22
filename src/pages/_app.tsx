import { ReactNode, useEffect } from 'react';

import Head from 'next/head';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import type { NextPage } from 'next';

import type { AppProps } from 'next/app';

import { cache } from '@emotion/css';

import { CacheProvider } from '@emotion/react';

import { RecoilRoot } from 'recoil';

import GlobalStyles from '@/styles/GlobalStyles';

import SWRConfig from '@/lib/swr/swr';

import Script from 'next/script';

import initializeKakaoSDK from '@/lib/kakao/initialize';

import initializeAppleAuth from '@/lib/apple/initialize';

import { updateVH } from '@/utils/updateVH';

import useNativeAppEventListeners from '@/hooks/useNativeAppEventListeners';

import usePageLoading from '@/hooks/usePageLoading';

import usePlatform from '@/hooks/usePlatform';

import AppConfig from '@/config';

import NegocioProvider from '@/providers/NegocioProvider';

import ErrorBoundary from '@/providers/ErrorBoundary';

import * as gtag from '@/lib/gtag';

import '../styles/globalFont.css';

import useInAppBrowserCheck from '@/states/hooks/useInAppBrowserCheck';

const OverlayContainer = dynamic(() => import('@/components/molecules/FullScreenDialog'), { ssr: false });

const TooltipProvider = dynamic(() => import('@/providers/TooltipProvider'), { ssr: false });

const ToastContainer = dynamic(() => import('@/lib/react-toastify'), { ssr: false });

const AppVersionChecker = dynamic(() => import('@/providers/AppVersionChecker'), { ssr: false });

const AuthPopup = dynamic(() => import('@/components/domains/auth/global-login'), { ssr: false });

const VerifyCiPopup = dynamic(() => import('@/components/domains/auth/global-verify-ci'), { ssr: false });

const GlobalAppInstall = dynamic(() => import('@/components/domains/auth/global-app-install'), { ssr: false });

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

  useInAppBrowserCheck();

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
      </Head>

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
      {/* <Script id="webviewApp-name-text-field-show" strategy="afterInteractive">
        {`window.focusOnNameTextField = function () {
            const ele = document.getElementById('negocio-register-name-input');
            if (ele) {
              ele.focus();
            }
        };`}
      </Script> */}
      {/* <Script id="webviewApp-phone-text-field-show" strategy="afterInteractive">
        {`window.focusOnPhoneTextField = function () {
            const ele = document.getElementById('negocio-register-phone-input');
            if (ele) {
              ele.focus();
            }
        };`}
      </Script> */}
      {/* <Script id="webviewApp-phoneVerify-field-show" strategy="afterInteractive">
        {`window.focusOnPhoneVerificationTextField = function () {
            const ele = document.getElementById('negocio-register-phone-verification-input');
            if (ele) {
              ele.focus();
            }
        };`}
      </Script> */}

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
        // src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        // integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
        integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
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
              <AuthPopup />
              <VerifyCiPopup />
              <GlobalAppInstall />
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
