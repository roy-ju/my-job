import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

export type ChatRoomListItem = {
  chat_room_id: number;
  chat_room_type: number;
  chat_room_closed_time: null;

  other_profile_image_full_path: string;
  other_name: string;
  deregistered: boolean;

  unread_message_count: number;
  latest_message: string;
  latest_message_time: string;
};

export interface GetChatRoomListResponse {
  list: Nullable<ChatRoomListItem[]>;
}

export default function useAPI_ChatRoomList(config?: {}) {
  const { user, isLoading: isLoadingUser } = useAuth();

  const { data, isLoading, mutate } = useSWR<GetChatRoomListResponse>(user ? '/chat/room/list' : null, null, config);

  return { data, isLoading: isLoading || isLoadingUser, mutate };
}
