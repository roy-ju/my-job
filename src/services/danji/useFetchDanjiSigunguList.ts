import useSWR from 'swr';

import { DanjiSigunguListResponse } from './types';

export function useFetchDanjiSigunguList({ sidoCode }: { sidoCode?: string | null }) {
  const { data, error } = useSWR<DanjiSigunguListResponse>(
    sidoCode ? ['/danji/sigungu/list', { sido_code: sidoCode }] : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}
