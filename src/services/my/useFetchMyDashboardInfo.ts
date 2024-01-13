import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

import authFetcher from '@/lib/swr/authFetcher';

import { DashboardInfoResponse } from './types';

export default function useFetchMyDashboardInfo() {
  const { user } = useAuth();

  return useSWR<DashboardInfoResponse>(user ? '/my/dashboard/info' : null, authFetcher, { revalidateOnFocus: false });
}
