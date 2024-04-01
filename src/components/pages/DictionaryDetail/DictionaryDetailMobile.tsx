import Head from 'next/head';

import DictionaryDetail from '@/components/domains/realestate-helper/DictionaryDetail';

import MobileContainer from '@/components/atoms/MobileContainer';

import AppConfig from '@/config';

export default function DictionaryDetailMobile({ metaTitle }: { metaTitle?: string | null }) {
  return (
    <>
      <Head>
        <title>{`부동산 용어 사전 > ${metaTitle ?? ''}`}</title>
        <meta name="description" content="부동산과 관련된 용어를 예시와 함께 설명해드려요!" />
        <meta property="og:title" content={`부동산 용어 사전 > ${metaTitle ?? ''}`} />
        <meta property="og:description" content="부동산과 관련된 용어를 예시와 함께 설명해드려요!" />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'}
        />
        <meta property="og:image" content={AppConfig.ogImagePath} />
      </Head>
      <MobileContainer>
        <DictionaryDetail />
      </MobileContainer>
    </>
  );
}
