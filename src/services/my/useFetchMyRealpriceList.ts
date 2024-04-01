import { useCallback, useMemo } from 'react';

import useSWRInfinite from 'swr/infinite';

import useAuth from '@/hooks/services/useAuth';

import { MyRealpriceListItemResponse } from './types';

function getKey(buyOrRent: number, sortBy: number) {
  return (size: number, previousPageData: MyRealpriceListItemResponse) => {
    if (size > 0 && (previousPageData === null || previousPageData.list.length < 1)) return null;

    return ['my/realprice/list', { page_number: size + 1, buy_or_rent: buyOrRent, sort_by: sortBy }];
  };
}

export default function useFetchMyRealPriceList(buyOrRent: number, sortBy: number) {
  const { user } = useAuth();

  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<MyRealpriceListItemResponse>(user ? getKey(buyOrRent, sortBy) : () => null);

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

  const list = useMemo(
    () =>
      data.map((item) => ({
        danjiName: item?.danji_name,
        price: item?.price,
        monthlyRentFee: item?.monthly_rent_fee,
        createdTime: `${item?.deal_year}.${item?.deal_month}.${item?.deal_day}`,
        area: item?.jeonyong_area,
        buyOrRent: item?.buy_or_rent,
        dealType: item?.deal_type,
        danjiID: item?.danji_id,
        realestateType: item?.realestate_type,
      })),
    [data],
  );

  return {
    isLoading,
    data,
    pageNumber: size,
    size,
    increamentPageNumber,
    setSize,
    mutate,
    updatedTime: dataList?.[0]?.updated_time,
    list,
  };
}
