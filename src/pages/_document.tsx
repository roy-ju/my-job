/* eslint-disable react/no-danger */
import { extractCritical } from '@emotion/server';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';

type NewDocumentInitialProps = DocumentInitialProps & {
  ids: string[];
  css: string;
};

class CustomDocument extends Document<NewDocumentInitialProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const critical = extractCritical(initialProps.html);
    initialProps.html = critical.html;
    initialProps.styles = (
      <>
        {initialProps.styles}
        <style
          data-emotion-css={critical.ids.join(' ')}
          dangerouslySetInnerHTML={{ __html: critical.css }}
        />
      </>
    );

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            data-emotion-css={this.props?.ids?.join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
          {/* 
          네이버 지도 CDN. 
          beforeInteractive(Load the script before any Next.js code and before any page hydration occurs.) 
          를 사용하기 위해서 _document.tsx 에 위치한다. 
          beforeInteractive 없이 하면 ReferenceError: naver is not defined 가 처음 렌더링때 뜬다.
        */}
          <Script
            strategy="beforeInteractive"
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`}
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
