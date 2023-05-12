import useAPI_ChatRoomList from '@/apis/chat/getChatRoomList';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useMemo } from 'react';
import { updateChatMessagesRead } from '@/apis/chat/updateChatMessagesRead';

export default function useChatRoomList(depth: number) {
  const router = useRouter(depth);
  const { data, isLoading } = useAPI_ChatRoomList();

  const chatRoomList = useMemo(() => {
    if (!data || !data.list) return [];
    return data.list.map((item) => ({
      id: item.chat_room_id,
      profileImagePath: item.agent_profile_image_full_path,
      officeName: item.agent_office_name,
      listingTitle: item.listing_title,
      unreadMessageCount: item.unread_message_count,
      lastMessage: item.latest_message,
      lastMessageTime: item.latest_message_time,
      additionalListingCount: item.additional_listing_count,

      active: true,
    }));
  }, [data]);

  const handleNavigateToMap = useCallback(() => {
    router.replace(Routes.Map);
  }, [router]);

  const handleClickListItem = useCallback(
    async (id: number) => {
      await updateChatMessagesRead(id);
      router.push(Routes.ChatRoom, {
        searchParams: { chatRoomID: `${id}` },
        state: {
          name: 'Jihyo',
        },
      });
    },
    [router],
  );

  return {
    chatRoomList,
    isLoading,
    handleClickListItem,
    handleNavigateToMap,
  };
}
