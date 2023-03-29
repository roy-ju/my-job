import { useAuth } from '@/hooks/services';
import useSWR from 'swr';

interface Response {
  total_unread_count: number;
}

export default function useAPI_GetUnreadNotificationCount() {
  const { user } = useAuth();

  const { data, mutate } = useSWR<Response>(user ? '/notification/unread/total' : null);
  return {
    count: data?.total_unread_count ?? 0,
    mutate,
  };
}
