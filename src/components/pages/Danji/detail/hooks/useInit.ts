import { useEffect, useMemo } from 'react';

import { useFetchDanjiListingsList } from '@/services/danji/useFetchDanjiListingsList';

import { useFetchDanjiSuggestsList } from '@/services/danji/useFetchDanjiSuggestsList';

import { useFetchNaverDanji } from '@/services/danji/useFetchNaverDanji';

import useDanjiDetailStore from './useDanjiDetailStore';

import useDanjiSuggestsOrListingsDispatch from './useDanjiSuggestsOrListingsDispatch';

import useCheckRecommendationService from './useCheckRecommendationService';

export default function useInit() {
  const store = useDanjiDetailStore();

  const dispatch = useDanjiSuggestsOrListingsDispatch();

  const danjiID = store?.danji?.danji_id ?? 0;

  const realestateType = store?.danji?.type;

  const listingsListData = useFetchDanjiListingsList({
    danjiID,
    realestateType,
    orderBy: 1,
    pageSize: 4,
  });

  const suggestListsData = useFetchDanjiSuggestsList({
    danjiID,
    pageSize: 4,
  });

  const naverDanjiData = useFetchNaverDanji({ id: danjiID });

  const checkRecommdationServiceData = useCheckRecommendationService();

  const collectionDatas = useMemo(
    () => ({
      listingsList: listingsListData,
      suggestList: suggestListsData,
      naverMap: naverDanjiData,
      recommedationService: checkRecommdationServiceData,
    }),
    [checkRecommdationServiceData, listingsListData, naverDanjiData, suggestListsData],
  );

  useEffect(() => () => dispatch?.({ type: 'set_data', payLoad: collectionDatas }), [collectionDatas]);
}
