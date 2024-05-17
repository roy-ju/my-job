import useSWR from 'swr';

import { HomeDanjisLoggedInResponse } from './types';

export default function useFetchHomeDanjisLoggedIn() {
  const { data, isLoading, mutate } = useSWR<HomeDanjisLoggedInResponse>('/home/danjis/loggedin');

  return {
    data,
    isLoading,
    mutate,
  };
}
