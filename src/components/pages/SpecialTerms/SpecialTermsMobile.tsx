import Head from 'next/head';

import SpecialTerms from '@/components/domains/realestate-helper/SpecialTerms';

import MobileContainer from '@/components/atoms/MobileContainer';

import Paths from '@/constants/paths';

export default function SpecialTermsMobile() {
  return (
    <>
      <Head>
        <title>
          {`계약서 및 특약사항 | ${
            process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
              ? '(TEST) 부동산 가격협상 앱 네고시오'
              : '부동산 가격협상 앱 네고시오'
          }`}
        </title>
        <meta name="description" content="계약서 작성부터 꼭 필요한 특약사항까지 모두 알려드려요!" />
        <meta property="og:title" content="계약서 및 특약사항" />
        <meta property="og:description" content="계약서 작성부터 꼭 필요한 특약사항까지 모두 알려드려요!" />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={Paths.DEFAULT_OPEN_GRAPH_IMAGE_1} />
      </Head>
      <MobileContainer>
        <SpecialTerms />
      </MobileContainer>
    </>
  );
}
