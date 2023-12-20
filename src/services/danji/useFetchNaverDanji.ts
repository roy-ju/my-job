import useSWR from 'swr';
import { NaverDanjiResponse } from './types';

export function useFetchNaverDanji({ id }: { id?: number }) {
  const { data, isLoading, error, mutate } = useSWR<NaverDanjiResponse>(
    id ? ['/danji/naver/complex/outlink', { danji_id: id }] : null,
    null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  return {
    mobileNaverURL: data?.outlink_mobile,
    pcNaverURL: data?.outlink_pc,
    isLoading: id ? isLoading : false,
    mutate,
    error,
  };
}
