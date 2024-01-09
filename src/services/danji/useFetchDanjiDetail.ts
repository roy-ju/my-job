import { useMemo } from 'react';

import { useRouter } from 'next/router';

import useSWR from 'swr';

import { DanjiDetailResponse } from './types';

export function useFetchDanjiDetail({
  prefetchedData,
  danjiID,
}: {
  prefetchedData?: { [key: string]: any } | null;
  danjiID?: number | null;
}) {
  const router = useRouter();

  const id = useMemo(() => {
    if (router?.query?.danjiID && Number(router.query.danjiID) > 0) {
      return Number(router.query.danjiID);
    }

    if (danjiID) return danjiID;

    return 0;
  }, [danjiID, router?.query?.danjiID]);

  return useSWR<DanjiDetailResponse>(id ? ['/danji/detail', { danji_id: id }] : null, null, {
    ...(prefetchedData ? { fallbackData: prefetchedData as DanjiDetailResponse } : {}),
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });
}
