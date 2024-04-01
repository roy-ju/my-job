import { useCallback, useMemo } from 'react';

import useSWRInfinite from 'swr/infinite';

import useAuth from '@/hooks/services/useAuth';

import { MyFavoriteDanjiListResponse } from './types';

function getKey(size: number, previousPageData: MyFavoriteDanjiListResponse) {
  const previousLength = previousPageData?.list?.length ?? 0;

  if (previousPageData && previousLength < 1) return null;

  return ['/my/favorite/danjis', { page_number: size + 1, page_size: 10 }];
}

export default function useFetchMyFavoriteDanjis() {
  const { user } = useAuth();

  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<MyFavoriteDanjiListResponse>(user ? getKey : () => null);

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
