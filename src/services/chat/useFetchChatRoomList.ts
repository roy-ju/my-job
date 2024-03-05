import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

import { ChatRoomListResponse } from './type';

export default function useFetchChatRoomList(config?: {}) {
  const { user, isLoading: isLoadingUser } = useAuth();

  const { data, isLoading, mutate } = useSWR<ChatRoomListResponse>(user ? '/chat/room/list' : null, null, config);

  return { data, isLoading: isLoading || isLoadingUser, mutate };
}
