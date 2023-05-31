import { useMemo } from 'react';
import useSWR from 'swr';

export interface GetNoticeDetailResponse {
  category: string;
  created_time: string;
  description: string;
  id: number;
  title: string;
}

export default function useAPI_GetNoticeDetail(id: number) {
  const { data, isLoading, mutate } = useSWR<GetNoticeDetailResponse>(['/notice/get', { notice_id: id }]);

  const notice = useMemo(
    () =>
      data
        ? {
            category: data.category,
            createdTime: data.created_time,
            description: data.description,
            id: data.id,
            title: data.title,
          }
        : undefined,
    [data],
  );

  return { data: notice, isLoading, mutate };
}
