import useAPI_ChatRoomList from '@/apis/chat/getChatRoomList';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
// import useSyncronizer from '@/states/syncronizer';
import { useCallback, useMemo } from 'react';

export default function useChatRoomList(depth: number) {
  const router = useRouter(depth);
  const { data, isLoading, mutate } = useAPI_ChatRoomList();

  // const { unreadChatCount } = useSyncronizer();

  // useEffect(() => {
  //   if (unreadChatCount) mutate();
  // }, [unreadChatCount, mutate]);

  const chatRoomList = useMemo(() => {
    if (!data || !data.list) return [];

    return data.list.map((item) => ({
      id: item.chat_room_id,
      chatRoomType: item.chat_room_type,
      profileImagePath: item.other_profile_image_full_path,
      officeName: item.other_name,
      listingTitle: item.title,
      unreadMessageCount: item.unread_message_count,
      lastMessage: item.latest_message,
      lastMessageTime: item.latest_message_time,

      active: true,
    }));
  }, [data]);

  const handleClickListItem = useCallback(
    async (id: number) => {
      router.push(Routes.ChatRoom, {
        searchParams: { chatRoomID: `${id}` },
      });

      mutate();
    },
    [router, mutate],
  );

  return {
    chatRoomList,
    isLoading,
    handleClickListItem,
  };
}
