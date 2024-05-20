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
  prefetchedData,
  prefetchedPhotosData,
  prefetchedSuggestList,
  prefetchedListingList,
  prefetchedNaverDanji,
  preselectedSchoolType,
  prefetchedDanjiSchoolData,
}: {
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
      {data?.danji_id && !isTrue && !isTrueAround && !isTrueSchool && (
        <MobileContainer>
          <DanjiDetailMobile
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
        <MobileContainer>
          <FullScreenMap danji={data} type={mapType} />
        </MobileContainer>
      )}

      {data?.danji_id && isTrueAround && (
        <MobileContainer>
          <DanjiAroundDetail danji={danjiAroundData} />
        </MobileContainer>
      )}

      {data?.danji_id && isTrueSchool && (
        <MobileContainer>
          <DanjiSchoolDetail lat={data?.lat} lng={data?.long} rt={data?.type} danjiID={data?.danji_id} />
        </MobileContainer>
      )}
    </>
  );
};

export default DanjiMobile;
