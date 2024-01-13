import useAuth from '@/hooks/services/useAuth';
import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export interface IFavoriteDanjiListItem {
  danji_id: number;
  realestate_type: number;
  eubmyundong: string;
  danji_name: string;
  road_name_address: string;
  total_saedae_count: string;
  year: string;
  month: string;
  day: string;
  jeonyong_min: string;
  jeonyong_max: string;
  buy_count: number;
  jeonsae_count: number;
  wolsae_count: number;
  is_favorite: boolean;
  dong_count: number;
}

export interface GetMyFavoriteDanjiListResponse {
  count: number;
  list: IFavoriteDanjiListItem[];
}

function getKey(size: number, previousPageData: GetMyFavoriteDanjiListResponse) {
  const previousLength = previousPageData?.list?.length ?? 0;
  if (previousPageData && previousLength < 1) return null;
  return ['/my/favorite/danjis', { page_number: size + 1, page_size: 10 }];
}

export default function useAPI_GetMyFavoriteDanjiList() {
  const { user } = useAuth();
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<GetMyFavoriteDanjiListResponse>(user ? getKey : () => null);
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
