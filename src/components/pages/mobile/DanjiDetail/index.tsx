/* eslint-disable react-hooks/exhaustive-deps */
import { MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { MobDanjiDetail } from '@/components/templates';
import { FullScreenMap } from '@/components/templates/MobDanjiDetail/Components/FullScreenMap';
import Paths from '@/constants/paths';
import Routes from '@/router/routes';
import { useDanjiMapButtonStore } from '@/states/mob/danjiMapButtonStore';
import { useDanjiMapTypeStore } from '@/states/mob/danjiMapTypeStore';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import useDanjiDetail from './useDanjiDetail';

const DanjiAroundDetail = dynamic(() => import('@/components/templates/MobDanjiDetail/Components/DanjiAroundDetail'), {
  ssr: false,
});

const DanjiSchoolDetail = dynamic(() => import('@/components/templates/MobDanjiDetail/Components/DanjiSchoolDetail'), {
  ssr: false,
});

const DanjiDetail = ({ prefetchedData }: { prefetchedData?: { [key: string]: any } | null }) => {
  const router = useRouter();
  const { danji, mutate } = useDanjiDetail(undefined, prefetchedData);

  const {
    danjiAroundData,
    isTrue,
    isTrueSchool,
    isTrueAround,
    makeFalse,
    makeFalseAround,
    makeFalseSchool,
    makeBindDanji,
  } = useDanjiMapButtonStore();

  const { mapType, makeGeneralMap, makePanoInitialize } = useDanjiMapTypeStore();

  const convertedTitle = useMemo(() => `'${danji?.name}'시세, 실거래가, 단지, 매물, 주변 정보`, [danji]);
  const convertedDescription = useMemo(
    () => `'${danji?.name}', 단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.` || '',
    [danji],
  );

  const handleMutateDanji = () => {
    mutate();
  };

  useEffect(
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

  if (!danji) {
    return null;
  }

  if (danji?.error_code) {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="py-10">
            <Popup.Title>유효하지 않은 페이지입니다.</Popup.Title>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={() => router.replace(`/${Routes.EntryMobile}`)}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return (
    <>
      <Head>
        <title>{convertedTitle || ''}</title>
        <meta name="description" content={convertedDescription} />
        <meta
          property="keywords"
          content={`'${
            danji?.name || ''
          }', 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`}
        />
        <meta property="og:title" content={`${danji?.name || ''}`} />
        <meta property="og:description" content={danji?.road_name_address ?? danji?.jibun_address ?? ''} />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={Paths.DEFAULT_OPEN_GRAPH_IMAGE_3} />
        <link rel="canonical" href={`https://www.negocio.co.kr/danjiDetail?danjiID=${danji?.danji_id}`} />
      </Head>
      {!isTrue && !isTrueAround && !isTrueSchool && (
        <MobileContainer>
          <MobDanjiDetail danji={danji} handleMutateDanji={handleMutateDanji} isShowTab />
        </MobileContainer>
      )}

      {isTrue && (
        <MobileContainer>
          <FullScreenMap danji={danji} type={mapType} />
        </MobileContainer>
      )}

      {isTrueAround && (
        <MobileContainer>
          <DanjiAroundDetail danji={danjiAroundData} />
        </MobileContainer>
      )}

      {isTrueSchool && (
        <MobileContainer>
          <DanjiSchoolDetail lat={danji?.lat} lng={danji?.long} rt={danji?.type} danjiID={danji?.danji_id} />
        </MobileContainer>
      )}
    </>
  );
};

export default DanjiDetail;
