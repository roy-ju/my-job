import { useMemo } from 'react';

import useSWR from 'swr';

import { ServiceQnaListResponse } from './types';

export default function useFetchServiceQnaList() {
  const { data, isLoading, mutate } = useSWR<ServiceQnaListResponse[]>('/my/serviceqna/list');

  const list = useMemo(
    () =>
      data?.map((item) => ({
        id: item.id,
        user_id: item.user_id,
        user_message: item.user_message,
        created_time: item.created_time,
        admin_message: item.admin_message,
        admin_response_time: item.admin_response_time,
      })) ?? [],
    [data],
  );

  return { list, isLoading, mutate };
}
