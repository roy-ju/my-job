import useSWR from 'swr';

export interface GetListingsForTheLoggedIn {
  list:
    | [
        {
          listing_id: number;
          thumbnail_full_path?: string;
          listing_title: string;
          realestate_type: number;
          jeonyong_area: string;
          floor_description: string;
          total_floor: string;
          direction: string;
          buy_or_rent: number;
          quick_sale?: boolean;
          trade_or_deposit_price: number;
          monthly_rent_fee: number;
          eubmyundong: string;
          is_favorite: boolean;
          favorite_count: number;
        },
      ]
    | null;
}

export default function useAPI_GetListingsForTheLoggedIn() {
  const { data, isLoading, mutate } = useSWR<GetListingsForTheLoggedIn>('/home/listings/loggedin');

  return {
    data,
    isLoading,
    mutate,
  };
}
