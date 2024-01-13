import useAuth from '@/hooks/services/useAuth';
import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export interface IFavoriteListingListItem {
  listing_id: number;
  thumbnail_full_path: string;
  listing_title: string;
  realestate_type: number;
  jeonyong_area: string;
  floor_description: string;
  total_floor: string;
  direction: string;
  buy_or_rent: number;
  quick_sale: boolean;
  is_participating: boolean;
  view_count: number;
  participants_count: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  eubmyundong: string;
  is_favorite: boolean;
  label_text: string;
  status_text: string;
}

export interface GetMyFavoriteListingListResponse {
  count: number;
  list: IFavoriteListingListItem[];
}

function getKey(orderBy: number) {
  return (size: number, previousPageData: GetMyFavoriteListingListResponse) => {
    if (size > 0 && (previousPageData === null || previousPageData?.list?.length < 1)) return null;
    return ['/my/favorite/listings', { page_number: size + 1, page_size: 10, order_by: orderBy }];
  };
}

export default function useAPI_GetMyFavoriteListingList(orderBy: number) {
  const { user } = useAuth();
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<GetMyFavoriteListingListResponse>(user ? getKey(orderBy) : () => null);
  const count = dataList?.[0]?.count;
  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item.list)
      .filter((item) => Boolean(item))
      .flat();
  }, [dataList]);

  const incrementalPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    count,
    data,
    pageNumber: size,
    isLoading,
    incrementalPageNumber,
    mutate,
  };
}
