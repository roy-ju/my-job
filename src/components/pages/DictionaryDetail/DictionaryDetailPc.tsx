import { memo } from 'react';

import Head from 'next/head';

import { useRouter } from 'next/router';

import DictionaryDetail from '@/components/domains/realestate-helper/DictionaryDetail';

import Panel from '@/components/atoms/Panel';

import useFetchSubHomeGuideDetail from '@/services/sub-home/useFetchSubHomeGuideDetail';

import AppConfig from '@/config';

interface Props {
  panelWidth?: string;
}

function DictionaryDetailPc({ panelWidth }: Props) {
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
      <Panel width={panelWidth}>
        <DictionaryDetail />
      </Panel>
    </>
  );
}

export default memo(DictionaryDetailPc);
