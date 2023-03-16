import { useAuth } from '@/hooks/services';
import useSWR from 'swr';

export interface GetChatRoomListResponse {
  list:
    | {
        chat_room_id: number;
        closed_time?: string;
        unread_message_count: number;
        latest_message: string;
        latest_message_time: string;
        agent_office_name: string;
        agent_profile_image_full_path: string;
        title: string;
        status: string;
        my_status: string;
        my_status2: string;
      }[]
    | null;
}

export default function useAPI_ChatRoomList() {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { data, isLoading } = useSWR<GetChatRoomListResponse>(user ? '/chat/room/list' : null);
  return { data, isLoading: isLoading || isLoadingUser };
}
