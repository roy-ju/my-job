import useSWR from 'swr';

import { ListingDetailResponse } from './types';

export default function useFetchListingDetail(id: number) {
  const { data, isLoading, mutate } = useSWR<ListingDetailResponse & ErrorResponse>(
    id !== 0 ? ['/listing/detail', { listing_id: id }] : null,
  );

  return { data, isLoading, mutate };
}
