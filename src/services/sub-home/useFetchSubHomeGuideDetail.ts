import useSWR from 'swr';

import { SubHomeGuideDetailResponse } from './types';

export default function useFetchSubHomeGuideDetail({ code, id }: { code: string; id: number }) {
  const { data, isLoading, mutate } = useSWR<SubHomeGuideDetailResponse>([
    '/subhome/guide/detail',
    { code, guide_id: id },
  ]);

  return { term: data?.term, relatedTerms: data?.related_terms ?? [], isLoading, mutate };
}
