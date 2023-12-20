import { useMemo, useEffect } from 'react';

import { useFetchDanjiListingsList } from '@/services/danji/useFetchDanjiListingsList';

import { useFetchDanjiSuggestsList } from '@/services/danji/useFetchDanjiSuggestsList';

import { useFetchNaverDanji } from '@/services/danji/useFetchNaverDanji';

import useDanjiDetailStore from '../../hooks/useDanjiDetailStore';

import useDanjiSuggestsOrListingsDispatch from '../../hooks/useDanjiSuggestsOrListingsDispatch';

import useCheckRecommendationService from '../../hooks/useCheckRecommendationService';

export default function FetchController() {
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

  // useEffect(() => {
  //   if (collectionDatas) {
  //     dispatch?.({ type: 'set_data', payLoad: collectionDatas });
  //   }
  // }, [collectionDatas, dispatch]);

  return null;
}
