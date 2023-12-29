import { DanjiDetail } from '@/components/pages/mobile';

import { fetcher } from '@/lib/swr';

import { NextPageWithLayout } from '@/pages/_app';

import {
  DanjiDetailResponse,
  DanjiPhotosResponse,
  DanjiListingListResponse,
  DanjiSuggestListResponse,
  NaverDanjiResponse,
} from '@/services/danji/types';

import { checkPlatform } from '@/utils/checkPlatform';

import { GetServerSideProps } from 'next';

const Page: NextPageWithLayout<{
  prefetchedData?: DanjiDetailResponse;
  prefetchedPhotosData?: DanjiPhotosResponse;
  prefetchedSuggestList?: DanjiSuggestListResponse;
  prefetchedListingList?: DanjiListingListResponse;
  prefetchedNaverDanji?: NaverDanjiResponse;
}> = ({ prefetchedData, prefetchedPhotosData, prefetchedSuggestList, prefetchedListingList, prefetchedNaverDanji }) => (
  <DanjiDetail
    prefetchedData={prefetchedData}
    prefetchedPhotosData={prefetchedPhotosData}
    prefetchedSuggestList={prefetchedSuggestList}
    prefetchedListingList={prefetchedListingList}
    prefetchedNaverDanji={prefetchedNaverDanji}
  />
);

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAgent = context.req.headers['user-agent'];
  const platform = checkPlatform(userAgent);

  let danjiDetail: DanjiDetailResponse | null = null;

  let danjiPhotos: DanjiPhotosResponse | null = null;

  let danjiSuggestList: DanjiSuggestListResponse = {
    list: [],
    total_count: 0,
  };

  let danjiListingList: DanjiListingListResponse = {
    list: [],
    total_count: 0,
  };

  let naverDanji: NaverDanjiResponse = {
    outlink_pc: '',
    outlink_mobile: '',
  };

  if (context.query.danjiID) {
    const response: DanjiDetailResponse = await fetcher(['/danji/detail', { danji_id: Number(context.query.danjiID) }]);

    if (response.danji_id) {
      danjiDetail = response;

      const danjiPhotosResponse: DanjiPhotosResponse = await fetcher([
        '/danji/photos',
        { danji_id: response.danji_id, realestate_type: response.type },
      ]);

      const danjiSuggestListResponse: DanjiSuggestListResponse = await fetcher([
        '/danji/suggest/list',
        { danji_id: response.danji_id, page_size: 4, page_number: 1 },
      ]);

      const danjiListingListResponse: DanjiListingListResponse = await fetcher([
        '/danji/listings/list',
        { danji_id: response.danji_id, realestate_type: response.type, order_by: 1, page_size: 4, page_number: 1 },
      ]);

      const naverDanjiResponse: NaverDanjiResponse = await fetcher([
        '/danji/naver/complex/outlink',
        { danji_id: response.danji_id },
      ]);

      if (danjiPhotosResponse?.danji_photos && danjiPhotosResponse.danji_photos.length > 0) {
        danjiPhotos = danjiPhotosResponse;
      }

      if (danjiSuggestListResponse?.list && danjiSuggestListResponse.list.length > 0) {
        danjiSuggestList = danjiSuggestListResponse;
      }

      if (danjiListingListResponse?.list && danjiListingListResponse.list.length > 0) {
        danjiListingList = danjiListingListResponse;
      }

      if (naverDanjiResponse?.outlink_pc || naverDanjiResponse?.outlink_mobile) {
        naverDanji = {
          outlink_pc: naverDanjiResponse?.outlink_pc || '',
          outlink_mobile: naverDanjiResponse?.outlink_mobile || '',
        };
      }
    }
  }

  return {
    props: {
      platform,
      ...(danjiDetail ? { prefetchedData: danjiDetail } : {}),
      ...(danjiPhotos ? { prefetchedPhotosData: danjiPhotos } : {}),
      prefetchedSuggestList: danjiSuggestList,
      prefetchedListingList: danjiListingList,
      prefetchedNaverDanji: naverDanji,
    },
  };
};

export default Page;
