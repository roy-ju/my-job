import { useCallback, useMemo } from 'react';

import useAuth from '@/hooks/services/useAuth';

import useSWRInfinite from 'swr/infinite';

import { MySuggestRecommendsResponse } from './types';

function getKey(suggestID: number | null, filter?: number) {
  return (size: number, previousPageData: MySuggestRecommendsResponse) => {
    if (previousPageData && !previousPageData?.list?.length) return null;

    if (previousPageData && (previousPageData.list?.length || 0) < 10) return null;

    return [`/my/suggest/recommends`, { page_number: size + 1, page_size: 10, suggest_id: suggestID, filter }];
  };
}

export default function useFetchMySuggestRecommends(suggestID: number | null, filter?: number, mySuggest?: boolean) {
  const { user } = useAuth();
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<MySuggestRecommendsResponse>(
    user && mySuggest && (suggestID || filter) ? getKey(suggestID, filter) : () => null,
    null,
    { revalidateFirstPage: false, revalidateOnMount: true },
  );
  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item.list)
      .filter((item) => Boolean(item))
      .flat() as MySuggestRecommendsResponse['list'];
  }, [dataList]);

  const increamentPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    data,
    pageNumber: size,
    count: dataList?.[0]?.count ?? 0,
    isLoading,
    increamentPageNumber,
    mutate,
    suggestStatus: dataList?.[0]?.suggest_status ?? 0,
  };
}
