import { useMemo } from 'react';
import useSWR from 'swr';

interface GetOptionListItem {
  id: number;
  name: string;
  created_time: string;
}
type GetOptionListResponse = GetOptionListItem[];

export default function useAPI_GetOptionList() {
  const { data, isLoading, mutate } = useSWR<GetOptionListResponse>('/listing/options');

  const list = useMemo(
    () =>
      data?.map((item) => ({
        id: item.id,
        name: item.name,
        createdTime: item.created_time,
      })) ?? [],
    [data],
  );

  return { list, isLoading, mutate };
}
