import useAuth from '@/hooks/services/useAuth';
import useSWR from 'swr';

export interface GetMyRecommendedListResponse {
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

export default function useAPI_getMyRecommendedList({ suggestId }: { suggestId?: number }) {
  const { user } = useAuth();

  const { data, isLoading, mutate } = useSWR<GetMyRecommendedListResponse>(
    !user || !suggestId ? null : ['/suggest/my/recommended/list', { suggest_id: suggestId }, {}],
  );

  return {
    data,
    list: data?.list || [],
    isLoading,
    mutate,
  };
}
