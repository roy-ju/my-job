/* eslint-disable react-hooks/exhaustive-deps */
import { MobileContainer } from '@/components/atoms';
import { MobDanjiDetail } from '@/components/templates';
import { FullScreenMap } from '@/components/templates/MobDanjiDetail/Components/FullScreenMap';
import { useDanjiMapButtonStore } from '@/states/mob/danjiMapButtonStore';
import { useDanjiMapTypeStore } from '@/states/mob/danjiMapTypeStore';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import useDanjiDetail from './useDanjiDetail';

const DanjiAroundDetail = dynamic(() => import('@/components/templates/MobDanjiDetail/Components/DanjiAroundDetail'), {
  ssr: false,
});

const DanjiSchoolDetail = dynamic(() => import('@/components/templates/MobDanjiDetail/Components/DanjiSchoolDetail'), {
  ssr: false,
});

const DanjiDetail = () => {
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
          <DanjiSchoolDetail lat={danji?.lat} lng={danji?.long} rt={danji?.type} pnu={danji?.pnu} />
        </MobileContainer>
      )}
    </>
  );
};

export default DanjiDetail;
