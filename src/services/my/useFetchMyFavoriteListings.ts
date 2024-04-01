import { useCallback, useMemo } from 'react';

import useSWRInfinite from 'swr/infinite';

import useAuth from '@/hooks/services/useAuth';

import { MyFavoriteListingListResponse } from './types';

function getKey(orderBy: number) {
  return (size: number, previousPageData: MyFavoriteListingListResponse) => {
    if (size > 0 && (previousPageData === null || previousPageData?.list?.length < 1)) return null;

    return ['/my/favorite/listings', { page_number: size + 1, page_size: 10, order_by: orderBy }];
  };
}

export default function useFetchMyFavoriteListings(orderBy: number) {
  const { user } = useAuth();

  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<MyFavoriteListingListResponse>(user ? getKey(orderBy) : () => null);

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
