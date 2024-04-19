import useSWR from 'swr';

import { HomeSuggestInfoResponse } from './types';

export default function useFetchHomeSuggestInfo() {
  const { data, isLoading, mutate } = useSWR<HomeSuggestInfoResponse>(['/home/suggest/info'], null, {
    revalidateOnFocus: false,
  });

  return {
    data,
    isLoading,
    mutate,
  };
}
