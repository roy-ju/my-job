import useSWR from 'swr';

export interface GetMostTradeCountResponse {
  region_name: string;
  list:
    | [
        {
          danji_id: number;
          pnu: string;
          realestate_type: number;
          eubmyundong: string;
          name: string;
          saedae_count: string;
          jeonyong_min: string;
          jeonyong_max: string;
          date: string;
          dong_count: string;
          trade_count: number;
          rent_count: number;
        },
      ]
    | null;
}

export default function useAPI_GetMostTradeCount() {
  const { data, isLoading, mutate } = useSWR<GetMostTradeCountResponse>('/home/danjis/mosttradecount');

  return {
    data,
    isLoading,
    mutate,
  };
}
