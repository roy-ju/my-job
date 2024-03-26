import Head from 'next/head';

import RealestateDocumentVerifyResult from '@/components/domains/realestate-helper/RealestateDocumentVerifyResult';

import MobileContainer from '@/components/atoms/MobileContainer';

import Paths from '@/constants/paths';

export default function RealestateDocumentVerifyResultMobile() {
  return (
    <>
      <Head>
        <title>등기부 조회</title>
        <meta name="description" content="부동산에서 가장 중요한 등기부, 이제 네고시오에서 무료로 조회해보세요!" />
        <meta property="og:title" content="등기부 조회" />
        <meta
          property="og:description"
          content="부동산에서 가장 중요한 등기부, 이제 네고시오에서 무료로 조회해보세요!"
        />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={Paths.DEFAULT_OPEN_GRAPH_IMAGE_1} />
      </Head>
      <MobileContainer>
        <RealestateDocumentVerifyResult />
      </MobileContainer>
    </>
  );
}
