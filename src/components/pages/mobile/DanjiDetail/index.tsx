/* eslint-disable react-hooks/exhaustive-deps */
import { MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { MobDanjiDetail } from '@/components/templates';
import { FullScreenMap } from '@/components/templates/MobDanjiDetail/Components/FullScreenMap';
import Routes from '@/router/routes';
import { useDanjiMapButtonStore } from '@/states/mob/danjiMapButtonStore';
import { useDanjiMapTypeStore } from '@/states/mob/danjiMapTypeStore';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useDanjiDetail from './useDanjiDetail';

const DanjiAroundDetail = dynamic(() => import('@/components/templates/MobDanjiDetail/Components/DanjiAroundDetail'), {
  ssr: false,
});

const DanjiSchoolDetail = dynamic(() => import('@/components/templates/MobDanjiDetail/Components/DanjiSchoolDetail'), {
  ssr: false,
});

const DanjiDetail = () => {
  const router = useRouter();
  const { danji, mutate } = useDanjiDetail();

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

  if (!danji) return null;

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
