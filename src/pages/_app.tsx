/* eslint-disable import/no-extraneous-dependencies */
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
import { useAuth } from '@/hooks/services';
<<<<<<< HEAD
import { Toast } from '@/components/atoms';

=======
import { ToastContainer } from 'react-toastify';
>>>>>>> 884de0f5903f5ac1e134b4c82d61fc3da5be3c2e
import 'react-toastify/dist/ReactToastify.css';

export type NextPageWithLayout<P = { children?: ReactNode }, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactNode, pageProps: any, prevPage?: ReactNode) => ReactNode;
  getComponent?: (pageProps: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function NegocioProvider({ children }: { children?: ReactNode }) {
  const { mutate } = useAuth();
  useEffect(() => {
    window.Negocio = {
      onLoginSuccess: () => {
        mutate();
      },
    };
  }, [mutate]);

  return children as JSX.Element;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const getComponent = Component.getComponent ?? ((p) => <Component {...p} />);

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous"
        onLoad={initializeKakaoSDK}
      />
      <CacheProvider value={cache}>
        <GlobalStyles />
        <RecoilRoot>
          <SWRConfig>
            <NegocioProvider>{getLayout(getComponent(pageProps), pageProps)}</NegocioProvider>
<<<<<<< HEAD
            <Toast autoClose={2000} position="top-center" closeButton={false} hideProgressBar newestOnTop limit={1} />
=======
            <ToastContainer autoClose={2000} theme="dark" hideProgressBar closeOnClick position="bottom-center" />
>>>>>>> 884de0f5903f5ac1e134b4c82d61fc3da5be3c2e
          </SWRConfig>
        </RecoilRoot>
      </CacheProvider>
    </>
  );
}
