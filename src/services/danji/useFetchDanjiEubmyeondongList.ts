import useSWR from 'swr';

import { DanjiEubmyeondongListResponse } from './types';

export function useFetchDanjiEubmyeondongList({ sigunguCode }: { sigunguCode?: string | null }) {
  const { data, error } = useSWR<DanjiEubmyeondongListResponse>(
    sigunguCode ? ['/danji/eubmyundong/list', { sigungu_code: sigunguCode }] : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}
