import useAPI_ChatRoomList from '@/apis/chat/getChatRoomList';
import Routes from '@/router/routes';
// import useSyncronizer from '@/states/syncronizer';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export default function useChatRoomList() {
  const router = useRouter();

  const { data, isLoading } = useAPI_ChatRoomList();

  // const { unreadChatCount } = useSyncronizer();

  // useEffect(() => {
  //   if (unreadChatCount) mutate();
  // }, [unreadChatCount, mutate]);

  const chatRoomList = useMemo(() => {
    if (!data || !data.list) return [];
    return data.list.map((item) => ({
      id: item.chat_room_id,
      chatRoomType: item.chat_room_type,
      typeTag: item.type_tag,
      profileImagePath: item.other_profile_image_full_path,
      name: item.other_name,
      title: item.title,
      unreadMessageCount: item.unread_message_count,
      lastMessage: item.latest_message,
      lastMessageTime: item.latest_message_time,

      active: true,
    }));
  }, [data]);

  const handleClickListItem = useCallback(
    async (id: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${id}`);
    },
    [router],
  );

  const handleClickRecommendationForm = useCallback(() => {
    router.push(Routes.RecommendationForm);
  }, [router]);

  return {
    chatRoomList,
    isLoading,
    handleClickListItem,
    handleClickRecommendationForm,
  };
}
