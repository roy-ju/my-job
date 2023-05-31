import useSWR from 'swr';

export interface GetMostFavoritesResponse {
  list:
    | [
        {
          buy_or_rent: number;
          direction: string;
          eubmyundong: string;
          favorite_count: number;
          floor_description: string;
          is_favorite: boolean;
          jeonyong_area: string;
          listing_id: number;
          listing_title: string;
          monthly_rent_fee: number;
          quick_sale?: boolean;
          realestate_type: number;
          thumbnail_full_path?: string;
          total_floor: string;
          trade_or_deposit_price: number;
        },
      ]
    | null;
}

export default function useAPI_GetMostFavorites() {
  const { data, isLoading, mutate } = useSWR<GetMostFavoritesResponse>('/home/listings/mostfavorites');

  return {
    data,
    isLoading,
    mutate,
  };
}
