import Head from 'next/head';

import Dictionary from '@/components/domains/realestate-helper/Dictionary';

import MobileContainer from '@/components/atoms/MobileContainer';

import Paths from '@/constants/paths';

export default function DictionaryMobile() {
  return (
    <>
      <Head>
        <title>부동산 용어 사전</title>
        <meta name="description" content="부동산과 관련된 용어를 예시와 함께 설명해드려요!" />
        <meta property="og:title" content="부동산 용어 사전" />
        <meta property="og:description" content="부동산과 관련된 용어를 예시와 함께 설명해드려요!" />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={Paths.DEFAULT_OPEN_GRAPH_IMAGE_1} />
      </Head>
      <MobileContainer>
        <Dictionary />
      </MobileContainer>
    </>
  );
}
