import { useMemo } from 'react';

import { useRouter } from 'next/router';

import useSWR from 'swr';

import { DanjiDetailResponse } from './types';

export function useFetchDanjiDetail({ preFetchedData }: { preFetchedData?: { [key: string]: any } | null }) {
  const router = useRouter();

  const id = useMemo(() => {
    if (router?.query?.danjiID && Number(router.query.danjiID) > 0) {
      return Number(router.query.danjiID);
    }

    return 0;
  }, [router.query.danjiID]);

  const { data, isLoading, error, mutate } = useSWR<DanjiDetailResponse>(
    id ? ['/danji/detail', { danji_id: id }] : null,
    null,
    {
      ...(preFetchedData ? { fallbackData: preFetchedData as DanjiDetailResponse } : {}),
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  return {
    danji: data,
    isLoading: id ? isLoading : false,
    mutate,
    error,
  };
}
