import { useMemo } from 'react';

import { useRouter } from 'next/router';

import useSWR from 'swr';

import { DanjiDetailResponse } from './types';

export function useFetchDanjiDetail({ prefetchedData }: { prefetchedData?: { [key: string]: any } | null }) {
  const router = useRouter();

  const id = useMemo(() => {
    if (router?.query?.danjiID && Number(router.query.danjiID) > 0) {
      return Number(router.query.danjiID);
    }

    return 0;
  }, [router.query.danjiID]);

  return useSWR<DanjiDetailResponse>(id ? ['/danji/detail', { danji_id: id }] : null, null, {
    ...(prefetchedData ? { fallbackData: prefetchedData as DanjiDetailResponse } : {}),
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });
}
