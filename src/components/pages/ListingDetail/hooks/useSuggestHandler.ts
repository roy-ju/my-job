import { useCallback, useState } from 'react';

import { KeyedMutator } from 'swr';

import { apiService } from '@/services';

import { ListingDetailResponse } from '@/services/listing/types';

export default function useSuggestHandler({
  data,
  mutateListing,
  handleClosePopup,
}: {
  data?: ListingDetailResponse & ErrorResponse;
  mutateListing: KeyedMutator<ListingDetailResponse & ErrorResponse>;
  handleClosePopup: () => void;
}) {
  const [isPopupButtonLoading, setIsPopupButtonLoading] = useState(false);

  const handleSuggestAcceptRecommend = useCallback(async () => {
    if (!data?.suggest_recommend_id) return;
    setIsPopupButtonLoading(true);

    await mutateListing();

    setIsPopupButtonLoading(false);

    handleClosePopup();
  }, [data?.suggest_recommend_id, mutateListing, handleClosePopup]);

  const handleSuggestNotInterested = useCallback(async () => {
    if (!data?.suggest_recommend_id) return;
    setIsPopupButtonLoading(true);

    await apiService.mySuggestRecommendNotIntersted({ id: data.suggest_recommend_id });

    await mutateListing();

    setIsPopupButtonLoading(false);

    handleClosePopup();
  }, [data?.suggest_recommend_id, mutateListing, handleClosePopup]);

  return { isPopupButtonLoading, handleSuggestAcceptRecommend, handleSuggestNotInterested };
}
