import { useMemo } from 'react';

import useFetchChatRoomList from '@/services/chat/useFetchChatRoomList';

export default function useGetChatRoomList() {
  const { data, isLoading, mutate } = useFetchChatRoomList();

  const chatRoomList = useMemo(() => {
    if (!data || !data.list) return [];

    return data.list.map((item) => ({
      id: item.chat_room_id,
      chatRoomType: item.chat_room_type,

      profileImagePath: item.deregistered
        ? process.env.NEXT_PUBLIC_NEGOCIO_DELETED_PROFILE_IMG_PATH
        : item.other_profile_image_full_path,

      name: item.deregistered ? '탈퇴한 회원' : item.other_name,

      unreadMessageCount: item.unread_message_count,
      lastMessage: item.latest_message,
      lastMessageTime: item.latest_message_time,

      active: !item.deregistered,
    }));
  }, [data]);

  return { chatRoomList, isLoading, mutate };
}
