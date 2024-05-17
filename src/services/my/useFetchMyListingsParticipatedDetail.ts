import useSWR from 'swr';

import { MyParticipatedListingDetailResponse } from './types';

export default function useFetchMyListingsParticipatedDetail(listingId: number, biddingId: number) {
  const { data, isLoading, mutate } = useSWR<MyParticipatedListingDetailResponse>(
    listingId && biddingId
      ? [`/my/listings/participated/detail`, { listing_id: listingId, bidding_id: biddingId }]
      : null,
  );

  return { data, isLoading, mutate };
}
