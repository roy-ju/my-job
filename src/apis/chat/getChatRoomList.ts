import { useAuth } from '@/hooks/services';
import useSWR from 'swr';

export interface GetChatRoomListResponse {
  list:
    | {
        chat_room_id: number;
        chat_room_type: number;
        agent_profile_image_full_path: string;
        agent_office_name: string;
        listing_title: string;
        unread_message_count: number;
        latest_message: string;
        latest_message_time: string;
        additional_listing_count: number;
      }[]
    | null;
}

export default function useAPI_ChatRoomList(config?: {}) {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { data, isLoading, mutate } = useSWR<GetChatRoomListResponse>(user ? '/chat/room/list' : null, config);
  return { data, isLoading: isLoading || isLoadingUser, mutate };
}
