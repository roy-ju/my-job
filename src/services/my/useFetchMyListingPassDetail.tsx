import useSWR from 'swr';

import { MyListingDetailPassedResponse } from './types';

export default function useFetchMyListingDetailPassed(listingId: number) {
  const { data, isLoading, mutate } = useSWR<MyListingDetailPassedResponse>(
    listingId ? [`/my/listing/past/detail`, { listing_id: listingId }] : null,
  );

  return { data, isLoading, mutate };
}
