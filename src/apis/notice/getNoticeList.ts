import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export interface GetNoticeListResponse {
  list: {
    id: number;
    category: string;
    title: string;
    created_time: string;
  }[];
}

function getKey(size: number, previousPageData: GetNoticeListResponse) {
  const previousLength = previousPageData?.list?.length ?? 0;
  if (previousPageData && previousLength < 1) return null;
  return [`/notice/list`, { page_number: size + 1, page_size: 10 }];
}

export default function useAPI_GetNoticeList() {
  const { data: dataList, size, setSize, isLoading, mutate } = useSWRInfinite<GetNoticeListResponse>(getKey);
  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item.list)
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
    mutate,
  };
}
