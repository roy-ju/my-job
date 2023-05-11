import useSWR from 'swr';

export interface GetDanjisForTheLoggedIn {
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

export default function useAPI_GetDanjisForTheLoggedIn() {
  const { data, isLoading, mutate } = useSWR<GetDanjisForTheLoggedIn>('/home/danjis/loggedin');

  return {
    data,
    isLoading,
    mutate,
  };
}
