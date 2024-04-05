import dynamic from 'next/dynamic';

import { useFetchDanjiDetail } from '@/services/danji/useFetchDanjiDetail';

import {
  DanjiDetailResponse,
  DanjiListingListResponse,
  DanjiPhotosResponse,
  DanjiSchoolsResponse,
  DanjiSuggestListResponse,
  NaverDanjiResponse,
} from '@/services/danji/types';

import DanjiDetailPc from '@/components/domains/danji/DanjiDetailPc';

import Panel from '@/components/atoms/Panel';

const InvalidAccess = dynamic(() => import('@/components/molecules/CommonPopups/InvalidAccess'), {
  ssr: false,
});

const DanjiPc = ({
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

  if (data && data?.error_code) {
    return <InvalidAccess />;
  }

  return (
    <Panel width="380px">
      {data && data?.danji_id && (
        <DanjiDetailPc
          danji={data}
          danjiPhotos={prefetchedPhotosData}
          danjiSuggestList={prefetchedSuggestList}
          danjiListingList={prefetchedListingList}
          danjiSchools={prefetchedDanjiSchoolData}
          naverDanji={prefetchedNaverDanji}
          preselectedSchoolType={preselectedSchoolType}
        />
      )}
    </Panel>
  );
};

export default DanjiPc;
