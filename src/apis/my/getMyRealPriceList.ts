import useAuth from '@/hooks/services/useAuth';
import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

interface RealPriceListItem {
  danji_id: number;
  realestate_type: number;
  danji_name: string;
  price: number;
  monthly_rent_fee: number;
  buy_or_rent: number;
  jeonyong_area: string;
  deal_year: string;
  deal_month: string;
  deal_day: string;
  deal_type: string;
  created_time: string;
}

export interface GetNotificationListResponse {
  list: RealPriceListItem[];
  page_number: number;
  updated_time: string;
}

function getKey(buyOrRent: number, sortBy: number) {
  return (size: number, previousPageData: GetNotificationListResponse) => {
    if (size > 0 && (previousPageData === null || previousPageData.list.length < 1)) return null;
    return ['my/realprice/list', { page_number: size + 1, buy_or_rent: buyOrRent, sort_by: sortBy }];
  };
}

export default function useAPI_GetMyRealPriceList(buyOrRent: number, sortBy: number) {
  const { user } = useAuth();
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<GetNotificationListResponse>(user ? getKey(buyOrRent, sortBy) : () => null);

  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item?.list)
      .filter((item) => Boolean(item))
      .flat();
  }, [dataList]);

  const increamentPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    data,
    pageNumber: size,
    isLoading,
    increamentPageNumber,
    size,
    setSize,
    mutate,
    updatedTime: dataList?.[0]?.updated_time,
  };
}
