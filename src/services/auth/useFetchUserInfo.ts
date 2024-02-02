import useSWR from 'swr';

import authFetcher from '@/lib/swr/authFetcher';

import { UserInfoResponse } from './types';

export default function useFetchUserInfo(options?: { revalidateIfStale?: boolean; revalidateOnFocus?: boolean }) {
  const { data, isLoading, mutate } = useSWR<UserInfoResponse>('/user/info/get', authFetcher, {
    ...options,
  });

  return {
    data,
    isLoading,
    mutate,
  };
}
