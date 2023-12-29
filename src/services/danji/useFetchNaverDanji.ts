import useSWR from 'swr';

import { NaverDanjiResponse } from './types';

export function useFetchNaverDanji({ id, prefetchedData }: { id?: number; prefetchedData?: NaverDanjiResponse }) {
  return useSWR<NaverDanjiResponse>(id ? ['/danji/naver/complex/outlink', { danji_id: id }] : null, null, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
    ...(prefetchedData ? { fallbackData: prefetchedData } : {}),
  });
}
