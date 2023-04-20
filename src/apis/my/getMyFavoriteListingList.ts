import { useAuth } from '@/hooks/services';
import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

interface GetMyFavoriteListingListResponse {
  count: number;
  list: {
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
  }[];
}

function getKey(size: number, previousPageData: GetMyFavoriteListingListResponse) {
  const previousLength = previousPageData?.list.length ?? 0;
  if (previousPageData && previousLength < 1) return null;
  return ['/my/favorite/listings', { page_number: size + 1, page_size: 10 }];
}

export default function useAPI_GetMyFavoriteListingList() {
  const { user } = useAuth();
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<GetMyFavoriteListingListResponse>(user ? getKey : () => null);
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
    data,
    pageNumber: size,
    isLoading,
    incrementalPageNumber,
    mutate,
  };
}
