import useAPI_ChatRoomList from '@/apis/chat/getChatRoomList';
import { useRouter } from '@/hooks/utils';
import { useCallback, useMemo } from 'react';

export default function useChatRoomList(depth: number) {
  const router = useRouter(depth);
  const { data, isLoading } = useAPI_ChatRoomList();

  const chatRoomList = useMemo(() => {
    if (!data || !data.list) return [];
    return data.list.map((item) => ({
      id: item.chat_room_id,
      title: item.title,
      lastMessage: item.latest_message,
      lastMessageTime: item.latest_message_time,
      unreadMessageCount: item.unread_message_count,
      profileImagePath: item.agent_profile_image_full_path,
      listingStatus: 'listingStatus',
      agentDescription: 'agent description',
      chatRoomType: item.my_status2,
      active: true,
    }));
  }, [data]);

  const handleClickListItem = useCallback(
    (id: number) => {
      router.push('chatRoom', { searchParams: { chatRoomID: id } });
    },
    [router],
  );

  return {
    chatRoomList,
    isLoading,
    handleClickListItem,
  };
}
