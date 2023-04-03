import { useMemo } from 'react';
import useSWR from 'swr';

export interface GetNoticeDetailResponse {
  admin_message: string;
  admin_response_time: string;
  created_time: string;
  id: number;
  user_id: number;
  user_message: string;
}

export default function useAPI_GetNoticeDetail(id: number) {
  const { data, isLoading, mutate } = useSWR<GetNoticeDetailResponse>(['/my/serviceqna/get', { service_qna_id: id }]);

  const notice = useMemo(
    () =>
      data
        ? {
            id: data.id,
            userId: data.user_id,
            userMessage: data.user_message,
            createdTime: data.created_time,
            adminMessage: data.admin_message,
            admin_response_time: data.admin_response_time,
          }
        : undefined,
    [data],
  );

  return { data: notice, isLoading, mutate };
}
