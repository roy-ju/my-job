import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

import authFetcher from '@/lib/swr/authFetcher';

interface Response {
  total_unread_count: number;
  chat_room_id: number;
}

export default function useAPI_GetUnreadChatCount(config?: {}) {
  const { user } = useAuth();

  const { data, mutate } = useSWR<Response>(user ? '/chat/unread/total' : null, authFetcher, config);
  return {
    count: data?.total_unread_count ?? 0,
    chat_room_id: data?.chat_room_id ?? 0,
    mutate,
  };
}
