import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import GlobalStyles from '@/styles/GlobalStyles';
import SWRConfig from '@/lib/swr';
import { AuthProvider } from '@/providers';

export type NextPageWithLayout<P = { children?: ReactNode }, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactNode, pageProps: any, prevPage?: ReactNode) => ReactNode;
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
      <GlobalStyles />
      <RecoilRoot>
        <SWRConfig>
          <AuthProvider>{getLayout(getComponent(pageProps), pageProps)}</AuthProvider>
        </SWRConfig>
      </RecoilRoot>
    </CacheProvider>
  );
}
