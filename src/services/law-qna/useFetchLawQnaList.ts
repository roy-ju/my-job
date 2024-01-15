import { useCallback, useMemo } from 'react';

import useSWRInfinite from 'swr/infinite';

import { LawQnaListResponse } from './types';

function getKey(searchQuery: string | null, pageSize?: number) {
  return (size: number, previousPageData: LawQnaListResponse) => {
    if (
      size > 0 &&
      (previousPageData === null || previousPageData?.list?.length < 1 || !previousPageData?.list?.length)
    ) {
      return null;
    }

    return ['/lawqna/list', { page_number: size + 1, page_size: pageSize || 10, search_query: searchQuery }];
  };
}

export default function useFetchLawQnaList({
  searchQuery,
  pageSize,
}: {
  searchQuery: string | null;
  pageSize?: number;
}) {
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<LawQnaListResponse>(getKey(searchQuery, pageSize), null, {
    revalidateOnFocus: false,
    revalidateFirstPage: false,
  });

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
