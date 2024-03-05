import { useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';

import useFetchChatRoomDetail from '@/services/chat/useFetchChatRoomDetail';

import useChatRoomDispatch from './useChatRoomDispatch';

export default function useClientChatRoomDetailData() {
  const dispatch = useChatRoomDispatch();

  const { query } = useRouter();

  const chatRoomID = useMemo(() => {
    if (query?.chatRoomID && Number(query.chatRoomID) > 0) {
      return Number(query.chatRoomID);
    }

    return 0;
  }, [query]);

  const { data, mutate } = useFetchChatRoomDetail(chatRoomID);

  useEffect(() => {
    if (data) {
      dispatch?.({ type: 'set_data', payLoad: data });
      dispatch?.({ type: 'set_render_condition', payLoad: 'success' });
    }
  }, [data, mutate, dispatch]);

  useEffect(() => {
    if (data?.chat_room_closed_time || data?.deregistered) {
      dispatch?.({ type: 'set_TextFieldDisabled', payLoad: true });
    }
  }, [data?.chat_room_closed_time, data?.deregistered, dispatch]);

  useEffect(() => {
    if (data?.list) {
      const chatMessages =
        data?.list?.map((chat) => ({
          id: chat.id,
          name: data.deregistered ? '탈퇴한 회원' : `${data?.other_name}`,
          profileImagePath: data.deregistered
            ? process.env.NEXT_PUBLIC_NEGOCIO_DELETED_PROFILE_IMG_PATH
            : data?.other_profile_image_full_path,

          message: chat.message,
          chatUserType: chat.chat_user_type,
          sentTime: chat.created_time,
          agentReadTime: chat.user2_read_time ? new Date(chat.user2_read_time) : null,
        })) ?? [];

      dispatch?.({ type: 'set_ChatMessages', payLoad: chatMessages });
    }
  }, [data, dispatch]);
}
