/* eslint-disable @next/next/no-css-tags */
/* eslint-disable react/no-danger */
import AppConfig from '@/config';
import { extractCritical } from '@emotion/server';
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

type NewDocumentInitialProps = DocumentInitialProps & {
  ids: string[];
  css: string;
};

class CustomDocument extends Document<NewDocumentInitialProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const critical = extractCritical(initialProps.html);
    initialProps.html = critical.html;
    initialProps.styles = (
      <>
        {initialProps.styles}
        <style data-emotion-css={critical.ids.join(' ')} dangerouslySetInnerHTML={{ __html: critical.css }} />
      </>
    );

    return initialProps;
  }

  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          <style data-emotion-css={this.props?.ids?.join(' ')} dangerouslySetInnerHTML={{ __html: this.props.css }} />
          {/* <link
            rel="stylesheet"
            as="style"
            crossOrigin="anonymous"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css"
          /> */}
          <link href="public/fonts/pretendard.css" rel="stylesheet" as="style" type="font/woff2" />
          <Script
            strategy="beforeInteractive"
            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder,panorama`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
