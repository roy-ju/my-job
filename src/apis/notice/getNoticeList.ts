import { useMemo } from 'react';
import useSWR from 'swr';

export interface GetNoticeListResponse {
  list: {
    id: number;
    category: string;
    title: string;
    created_time: string;
  }[];
}

export default function useAPI_GetNoticeList() {
  const { data, isLoading, mutate } = useSWR<GetNoticeListResponse>('/notice/list');

  const list = useMemo(
    () =>
      data?.list.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        createdTime: item.created_time,
      })) ?? [],
    [data],
  );

  return { list, isLoading, mutate };
}
