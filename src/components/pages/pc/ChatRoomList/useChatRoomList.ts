import useAPI_ChatRoomList from '@/apis/chat/getChatRoomList';

import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useMemo } from 'react';

export default function useChatRoomList(depth: number) {
  const router = useRouter(depth);
  const { data, isLoading, mutate } = useAPI_ChatRoomList();

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

  const handleClickListItem = useCallback(
    async (id: number) => {
      router.push(Routes.ChatRoom, {
        searchParams: { chatRoomID: `${id}` },
      });

      mutate();
    },
    [router, mutate],
  );

  const handleClickSuggestForm = useCallback(() => {
    router.replace(Routes.SuggestForm, {
      searchParams: {
        entry: 'chatRooomList',
        back: router.asPath,
      },
    });
  }, [router]);

  return {
    chatRoomList,
    isLoading,
    handleClickListItem,
    handleClickSuggestForm,
  };
}
