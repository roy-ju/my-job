import { useMemo } from 'react';
import useSWR from 'swr';

export interface GetServiceQnaListResponse {
  list: {
    admin_message: 'string';
    admin_response_time: 'string';
    created_time: 'string';
    id: 0;
    user_id: 0;
    user_message: 'string';
  }[];
}

export default function useAPI_GetServiceQnaList() {
  const { data, isLoading, mutate } = useSWR<GetServiceQnaListResponse>('/my/serviceqna/list');

  const list = useMemo(
    () =>
      data?.list.map((item) => ({
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
