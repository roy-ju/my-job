import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

import { SubHomeRealestatedocumentListResponse } from './types';

export default function useFetchSubHomeRealestateDocumentList() {
  const user = useAuth();

  const { data, isLoading, mutate } = useSWR<SubHomeRealestatedocumentListResponse>(
    user ? ['/subhome/realestatedocument/list'] : null,
  );

  return { list: data?.list ?? [], remainingCount: data?.remaining_count ?? 0, isLoading, mutate };
}
