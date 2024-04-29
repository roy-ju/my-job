import { useMemo } from 'react';

import useSWR from 'swr';

import { OptionListResponse } from './types';

export default function useFetchOptionList() {
  const { data, isLoading, mutate } = useSWR<OptionListResponse>('/listing/options');

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
