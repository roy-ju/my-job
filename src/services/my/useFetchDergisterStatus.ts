import useSWR from 'swr';

import { DeregisterResponse } from './types';

export default function useFetchDergisterStatus() {
  const { data, error, isLoading } = useSWR<DeregisterResponse | null>('/my/user/deregister/status');

  return { data, error, isLoading };
}
