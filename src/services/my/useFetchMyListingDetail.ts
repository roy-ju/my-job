import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

import { MyListingDetailResponse } from './types';

export default function useFetchMyListingDetail(listingID: number) {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { data, isLoading, mutate } = useSWR<MyListingDetailResponse & ErrorResponse>(
    user && listingID ? ['/my/listing/detail', { listing_id: listingID }] : null,
  );
  return { data, isLoading: isLoading || isLoadingUser, mutate };
}
