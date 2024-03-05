import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

import { ChatRoomDetailResponse } from './type';

export default function useFetchChatRoomDetail(id: number) {
  const { user, isLoading: isLoadingUser } = useAuth();

  const { data, isLoading, mutate } = useSWR<ChatRoomDetailResponse>(
    user && id ? ['/chat/room/detail', { chat_room_id: id }] : null,
  );

  return { data, isLoading: isLoading || isLoadingUser, mutate };
}
