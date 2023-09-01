import { useAuth } from '@/hooks/services';
import useSWR from 'swr';

export interface GetChatRoomListResponse {
  list:
    | {
        chat_room_id: number;
        chat_room_type: number;
        type_tag: string;
        title: string;
        other_profile_image_full_path: string;
        other_name: string;
        unread_message_count: number;
        latest_message: string;
        latest_message_time: string;
      }[]
    | null;
}

export default function useAPI_ChatRoomList(config?: {}) {
  const { user, isLoading: isLoadingUser } = useAuth();

  const { data, isLoading, mutate } = useSWR<GetChatRoomListResponse>(user ? '/chat/room/list' : null, config);

  return { data, isLoading: isLoading || isLoadingUser, mutate };
}
