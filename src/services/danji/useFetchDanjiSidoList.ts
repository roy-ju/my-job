import useSWR from 'swr';

import { DanjiSidoListResponse } from './types';

export function useFetchDanjiSidoList() {
  const { data, error } = useSWR<DanjiSidoListResponse>('/danji/sido/list', null, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}
