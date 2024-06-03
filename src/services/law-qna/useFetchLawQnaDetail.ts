import useSWR from 'swr';

import { LawQnaDetailResponse } from './types';

export default function useFetchLawQnaDetail(id?: number) {
  const { data, isLoading, mutate } = useSWR<LawQnaDetailResponse & ErrorResponse>(
    id ? ['/lawqna/get', { law_qna_id: id }] : null,
    null,
    { revalidateOnFocus: false },
  );

  return { data, isLoading, mutate };
}
