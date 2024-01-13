import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

import authFetcher from '@/lib/swr/authFetcher';

export interface GetRecommendsCountsResponse {
  sent_count: number;
  accepted_count: number;
  not_interested_count: number;
}

export default function useAPI_GetRecommendsCounts() {
  const { user } = useAuth();
  const { data, isLoading, mutate } = useSWR<GetRecommendsCountsResponse>(
    user ? '/my/suggest/recommends/counts' : null,
    authFetcher,
  );
  return {
    data,
    isLoading,
    mutate,
  };
}
