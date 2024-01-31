import { useMemo } from 'react';

import useSWR from 'swr';

import { ServiceQnaDetailResponse } from './types';

export default function useFetchServiceQnaDetail(id: number) {
  const { data, isLoading, mutate } = useSWR<ServiceQnaDetailResponse>(['/my/serviceqna/get', { service_qna_id: id }]);

  const qna = useMemo(
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

  return { data: qna, isLoading, mutate };
}
