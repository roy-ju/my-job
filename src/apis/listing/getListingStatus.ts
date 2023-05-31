import useSWR from 'swr';

export interface GetListingDetailResponse {
  status: number;
  visit_user_type: number;
  can_access: boolean;
}

export default function useAPI_GetListingStatus(id: number) {
  const { data, isLoading, mutate } = useSWR<GetListingDetailResponse & ErrorResponse>([
    '/listing/status',
    { listing_id: id },
  ]);

  return { data, isLoading, mutate };
}
