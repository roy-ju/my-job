import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

import authFetcher from '@/lib/swr/authFetcher';

interface Response {
  total_unread_count: number;
}

export default function useAPI_GetUnreadNotificationCount() {
  const { user } = useAuth();

  const { data, mutate } = useSWR<Response>(user ? '/notification/unread/total' : null, authFetcher);
  return {
    count: data?.total_unread_count ?? 0,
    mutate,
  };
}
