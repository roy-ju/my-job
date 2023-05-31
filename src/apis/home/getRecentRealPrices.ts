import useSWR from 'swr';

export interface GetRecentRealPricesResponse {
  has_address: boolean;
  has_favorite_danji: boolean;
  list:
    | [
        {
          danji_id: number;
          pnu: string;
          realestate_type: number;
          eubmyundong: string;
          name: string;
          is_direct_deal: boolean;
          buy_or_rent: number;
          trade_or_deposit_price: number;
          monthly_rent_fee: number;
          deal_date: string;

          saedae_count: string;
          jeonyong_min: string;
          jeonyong_max: string;
          date: string;
          dong_count: string;

          total_count: number;
          buy_count: number;
          rent_count: number;
        },
      ]
    | null;
}

export default function useAPI_GetRecentRealPrices() {
  const { data, isLoading, mutate } = useSWR<GetRecentRealPricesResponse>('/home/danjis/recentrealprice');

  return {
    data,
    isLoading,
    mutate,
  };
}
