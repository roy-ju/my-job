import React, { useMemo } from 'react';

import Head from 'next/head';

import dynamic from 'next/dynamic';

import MobileContainer from '@/components/atoms/MobileContainer';

import useMobileDanjiMap from '@/states/hooks/useMobileDanjiMap';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import { useFetchDanjiDetail } from '@/services/danji/useFetchDanjiDetail';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import {
  DanjiDetailResponse,
  DanjiListingListResponse,
  DanjiPhotosResponse,
  DanjiSchoolsResponse,
  DanjiSuggestListResponse,
  NaverDanjiResponse,
} from '@/services/danji/types';

import DanjiDetailMobile from '@/components/domains/danji/DanjiDetailMobile';
import Paths from '@/constants/paths';

const InvalidAccessPopup = dynamic(() => import('@/components/organisms/popups/InvalidAccessPopup'), {
  ssr: false,
});

const FullScreenMap = dynamic(() => import('@/components/domains/danji/detail/full-screen-map'), {
  ssr: false,
});

const DanjiAroundDetail = dynamic(() => import('@/components/domains/danji/detail/danji-around-detail-mobile'), {
  ssr: false,
});

const DanjiSchoolDetail = dynamic(() => import('@/components/domains/danji/detail/danji-school-detail-mobile'), {
  ssr: false,
});

const DanjiMobile = ({
  isSeo,
  prefetchedData,
  prefetchedPhotosData,
  prefetchedSuggestList,
  prefetchedListingList,
  prefetchedNaverDanji,
  preselectedSchoolType,
  prefetchedDanjiSchoolData,
}: {
  isSeo: boolean;
  prefetchedData?: DanjiDetailResponse;
  prefetchedPhotosData?: DanjiPhotosResponse;
  prefetchedSuggestList?: DanjiSuggestListResponse;
  prefetchedListingList?: DanjiListingListResponse;
  prefetchedNaverDanji?: NaverDanjiResponse;
  preselectedSchoolType: number;
  prefetchedDanjiSchoolData?: DanjiSchoolsResponse;
}) => {
  const { data } = useFetchDanjiDetail({ prefetchedData });

  const {
    danjiAroundData,
    isTrue,
    isTrueSchool,
    isTrueAround,
    makeFalse,
    makeFalseAround,
    makeFalseSchool,
    makeBindDanji,
  } = useMobileDanjiInteraction();

  const { mapType, makeGeneralMap, makePanoInitialize } = useMobileDanjiMap();

  const convertedTitle = useMemo(() => `'${data?.name}'시세, 실거래가, 단지, 매물, 주변 정보`, [data]);

  const convertedDescription = useMemo(
    () => `'${data?.name}', 단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.` || '',
    [data],
  );

  useIsomorphicLayoutEffect(
    () => () => {
      makeFalse();
      makeFalseAround();
      makeFalseSchool();
      makeGeneralMap();
      makeBindDanji(undefined);
      makePanoInitialize();
    },
    [],
  );

  if (data?.error_code) {
    return <InvalidAccessPopup />;
  }

  return (
    <>
      <Head>
        <title>{convertedTitle || ''}</title>
        <meta name="description" content={convertedDescription} />
        <meta
          property="keywords"
          content={`'${
            data?.name || ''
          }', 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`}
        />
        <meta property="og:title" content={`${data?.name || ''}`} />
        <meta property="og:description" content={data?.road_name_address ?? data?.jibun_address ?? ''} />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={Paths.DEFAULT_OPEN_GRAPH_IMAGE_3} />
        <meta
          property="og:url"
          content={
            isSeo
              ? `https://www.negocio.co.kr/m/danji/${data?.danji_id}`
              : `https://www.negocio.co.kr/m/danjiDetail?danjiID=${data?.danji_id}`
          }
        />
        {!isSeo && <link rel="canonical" href={`https://www.negocio.co.kr/danjiDetail?danjiID=${data?.danji_id}`} />}
      </Head>

      {data?.danji_id && !isTrue && !isTrueAround && !isTrueSchool && (
        <MobileContainer maxWidth={isSeo ? '500px' : undefined}>
          <DanjiDetailMobile
            isSeo={isSeo}
            danji={data}
            danjiPhotos={prefetchedPhotosData}
            danjiSuggestList={prefetchedSuggestList}
            danjiListingList={prefetchedListingList}
            danjiSchools={prefetchedDanjiSchoolData}
            naverDanji={prefetchedNaverDanji}
            preselectedSchoolType={preselectedSchoolType}
          />
        </MobileContainer>
      )}

      {data?.danji_id && isTrue && (
        <MobileContainer maxWidth={isSeo ? '500px' : undefined}>
          <FullScreenMap danji={data} type={mapType} />
        </MobileContainer>
      )}

      {data?.danji_id && isTrueAround && (
        <MobileContainer maxWidth={isSeo ? '500px' : undefined}>
          <DanjiAroundDetail danji={danjiAroundData} />
        </MobileContainer>
      )}

      {data?.danji_id && isTrueSchool && (
        <MobileContainer maxWidth={isSeo ? '500px' : undefined}>
          <DanjiSchoolDetail lat={data?.lat} lng={data?.long} rt={data?.type} danjiID={data?.danji_id} />
        </MobileContainer>
      )}
    </>
  );
};

export default DanjiMobile;
