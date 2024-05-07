import useSWR from 'swr';

import { HomeDashboardInfoResponse } from './types';

export default function useFetchHomeDashboardInfo() {
  const { data, isLoading, mutate } = useSWR<HomeDashboardInfoResponse>('/home/dashboard/info');

  return {
    data,
    isLoading,
    mutate,
  };
}
