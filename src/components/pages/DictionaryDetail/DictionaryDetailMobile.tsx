import Head from 'next/head';

import { useRouter } from 'next/router';

import DictionaryDetail from '@/components/domains/realestate-helper/DictionaryDetail';

import MobileContainer from '@/components/atoms/MobileContainer';

import useFetchSubHomeGuideDetail from '@/services/sub-home/useFetchSubHomeGuideDetail';

import AppConfig from '@/config';

export default function DictionaryMobile() {
  const router = useRouter();

  const id = Number(router.query.dictID);

  const { term } = useFetchSubHomeGuideDetail({ code: 'DICT', id });

  return (
    <>
      <Head>
        <title>{`부동산 용어 사전 > ${term?.name ?? ''} | ${AppConfig.title}`}</title>
        <meta name="description" content="부동산과 관련된 용어를 예시와 함께 설명해드려요!" />
        <meta property="og:title" content={`부동산 용어 사전 > ${term?.name ?? ''}`} />
        <meta property="og:description" content="부동산과 관련된 용어를 예시와 함께 설명해드려요!" />
        <meta property="og:image" content={AppConfig.ogImagePath} />
      </Head>
      <MobileContainer>
        <DictionaryDetail />
      </MobileContainer>
    </>
  );
}
