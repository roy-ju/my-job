import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export interface GetMySuggestListResponse {
  list:
    | {
        suggest_id: number;
        realestate_types: string;
        title: string;
        status: number;
        created_time: string;
      }[]
    | null;
}

function getKey(size: number, previousPageData: GetMySuggestListResponse) {
  const previousLength = previousPageData?.list?.length ?? 0;
  if (previousPageData && previousLength < 1) return null;
  return [`/my/suggest/list`, { page_number: size + 1, page_size: 10 }];
}

export default function useAPI_GetMySuggestList() {
  const { data: dataList, size, setSize, isLoading, mutate } = useSWRInfinite<GetMySuggestListResponse>(getKey);
  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item.list)
      .filter((item) => Boolean(item))
      .flat() as GetMySuggestListResponse['list'];
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
