import useSWR from 'swr';

export interface GetRecentRealPricesResponse {
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
