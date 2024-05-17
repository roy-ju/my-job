import useSWR from 'swr';

import { HomeListingsLoggedInResponse } from './types';

export default function useFetchHomeListingsLoggedIn() {
  const { data, isLoading, mutate } = useSWR<HomeListingsLoggedInResponse>('/home/listings/loggedin');

  return {
    data,
    isLoading,
    mutate,
  };
}
