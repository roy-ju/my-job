import { useAuth } from '@/hooks/services';
import useSWR from 'swr';

export interface GetChatRoomDetailResponse {
  chat_room_id: number;
  listing_title: string;
  agent_profile_image_full_path: string;
  agent_office_name: string;
  agent_name: string;
  agent_description: string;
  oldest_unread_chat_id: any;
  chat_room_type: number;
  chat_user_type: number;
  additional_listing_count: number;

  list?: {
    id: number;
    chat_room_id: number;
    user_id: any;
    chat_user_type: number;
    message: string;
    user_read_time: string;
    agent_read_time: string;
    created_time: string;
  }[];
}

export default function useAPI_ChatRoomDetail(id: number) {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { data, isLoading } = useSWR<GetChatRoomDetailResponse>(
    user ? ['/chat/room/detail', { chat_room_id: id }] : null,
  );
  return { data, isLoading: isLoading || isLoadingUser };
}
