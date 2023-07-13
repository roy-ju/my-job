import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export interface ILawQnaListItem {
  id: number;
  status_text: string;
  title: string;
  user_message: string;
  view_count: number;
  like_count: number;
  mine: boolean;
  liked: boolean;
  created_time: string;
}

export interface GetLawQnaListResponse {
  list: ILawQnaListItem[];
}

function getKey(searchQuery: string | null, pageSize?: number | undefined) {
  return (size: number, previousPageData: GetLawQnaListResponse) => {
    if (
      size > 0 &&
      (previousPageData === null || previousPageData?.list?.length < 1 || !previousPageData?.list?.length)
    ) {
      return null;
    }

    return ['/lawqna/list', { page_number: size + 1, page_size: pageSize || 10, search_query: searchQuery }];
  };
}

export default function useAPI_GetLawQna(searchQuery: string | null, pageSize?: number | undefined) {
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<GetLawQnaListResponse>(getKey(searchQuery, pageSize), null, {
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
