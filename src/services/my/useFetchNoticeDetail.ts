import { useMemo } from 'react';

import useSWR from 'swr';

export interface NoticeDetailResponse {
  category: string;
  created_time: string;
  description: string;
  id: number;
  title: string;
}

export default function useFetchNoticeDetail({ id }: { id: number }) {
  const { data, isLoading, mutate } = useSWR<NoticeDetailResponse>(['/notice/get', { notice_id: id }]);

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
