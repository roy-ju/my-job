import useAPI_ChatRoomList from '@/apis/chat/getChatRoomList';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export default function useChatRoomList() {
  const router = useRouter();
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

  const handleClickListItem = useCallback(
    (id: number) => {
      console.log(id);
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${id}`);
    },
    [router],
  );

  return {
    chatRoomList,
    isLoading,
    handleClickListItem,
  };
}
