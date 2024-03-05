import { useCallback, useMemo } from 'react';

import useSWRInfinite from 'swr/infinite';

export type NoticeListItem = {
  id: number;
  category?: string;
  title: string;
  created_time: string;
};

export interface NoticeListResponse {
  list: NoticeListItem[];
}

function getKey(size: number, previousPageData: NoticeListResponse) {
  const previousLength = previousPageData?.list?.length ?? 0;

  if (previousPageData && previousLength < 1) return null;

  return [`/notice/list`, { page_number: size + 1, page_size: 10 }];
}

export default function useFetchNoticeList() {
  const { data: dataList, size, setSize, isLoading, mutate } = useSWRInfinite<NoticeListResponse>(getKey);

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
