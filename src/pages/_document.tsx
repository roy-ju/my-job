import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <Script
          strategy="beforeInteractive"
          src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=424xzdpsnw&submodules=geocoder"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
