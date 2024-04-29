import useSWR from 'swr';

import { ListingStatusResponse } from './types';

export default function useFetchListingStatus(id: number) {
  const { data, isLoading, mutate } = useSWR<ListingStatusResponse & ErrorResponse>([
    '/listing/status',
    { listing_id: id },
  ]);

  return { data, isLoading, mutate };
}
