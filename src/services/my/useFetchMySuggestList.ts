import { useCallback, useMemo } from 'react';

import useAuth from '@/hooks/services/useAuth';

import useSWRInfinite from 'swr/infinite';

import { MySuggestListResponse } from './types';

function getKey(size: number, previousPageData: MySuggestListResponse) {
  const previousLength = previousPageData?.list?.length ?? 0;
  if (previousPageData && previousLength < 1) return null;
  return [`/my/suggest/list`, { page_number: size + 1, page_size: 10 }];
}

export default function useFetchMySuggestList() {
  const { user } = useAuth();

  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<MySuggestListResponse>(user ? getKey : () => null);

  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item.list)
      .filter((item) => Boolean(item))
      .flat() as MySuggestListResponse['list'];
  }, [dataList]);

  const increamentPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    data,
    pageNumber: size,
    isLoading,
    increamentPageNumber,
    mutate,
  };
}
