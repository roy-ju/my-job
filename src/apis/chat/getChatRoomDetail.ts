import { useAuth } from '@/hooks/services';
import useSWR from 'swr';

export interface GetChatRoomDetailResponse {
  chat_room_id: number;
  chat_room_type: number;
  chat_user_type: number;

  oldest_unread_chat_id: any;
  other_name: string;
  other_profile_image_full_path: string;
  title: string;

  list?: {
    chat_room_id: number;
    chat_user_type: number;
    created_time: string;
    id: number;
    message: string;
    user1_read_time: string;
    user2_read_time: string;
    user_id: any;
  }[];
}

export default function useAPI_ChatRoomDetail(id: number) {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { data, isLoading } = useSWR<GetChatRoomDetailResponse>(
    user ? ['/chat/room/detail', { chat_room_id: id }] : null,
  );
  return { data, isLoading: isLoading || isLoadingUser };
}
