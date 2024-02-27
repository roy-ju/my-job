import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

export interface SuggestMyRecommendedListResponse {
  list:
    | {
        suggest_recommend_id: number;
        suggest_recommend_status: number;
        with_address: boolean;
        address_free_text: string;
        trade_or_deposit_price: number;
        monthly_rent_fee: number;
        jeonyong_areas: string;
        floor: string;
        direction: string;
        buy_or_rent: number;
        note: string;
      }[]
    | null;
}

export default function useFetchSuggestMyRecommendedList({ suggestId }: { suggestId?: number }) {
  const { user } = useAuth();

  const { data, isLoading, mutate } = useSWR<SuggestMyRecommendedListResponse>(
    !user || !suggestId ? null : ['/suggest/my/recommended/list', { suggest_id: suggestId }, {}],
  );

  return {
    data,
    list: data?.list || [],
    isLoading,
    mutate,
  };
}
