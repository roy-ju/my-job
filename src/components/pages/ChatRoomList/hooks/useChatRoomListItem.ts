import { useMemo } from 'react';

import { formatLastMessageTime } from '@/utils/formatsTime';

import { ChatRoomListItem } from '@/apis/chat/getChatRoomList';

export default function useChatRoomListItem(item: ChatRoomListItem) {
  const { latest_message_time, latest_message, unread_message_count } = item;

  const lastMessage = useMemo(() => {
    if (latest_message.includes(process.env.NEXT_PUBLIC_NEGOCIO_CHAT_PHOTO)) return '사진';

    if (latest_message.includes(process.env.NEXT_PUBLIC_NAVER_MAP_URL)) return '장소공유';

    return latest_message;
  }, [latest_message]);

  const latestMessageTimeText = useMemo(() => formatLastMessageTime(latest_message_time), [latest_message_time]);

  const unreadRenderCodition = unread_message_count > 0 ? (unread_message_count > 9 ? '1' : '2') : '';

  const unreadMessageCountText = unread_message_count > 99 ? '99+' : unread_message_count;

  const profileImagePath = useMemo(() => {
    if (item.deregistered || item.chat_room_closed_time) {
      return process.env.NEXT_PUBLIC_NEGOCIO_DELETED_PROFILE_IMG_PATH;
    }

    return item.other_profile_image_full_path;
  }, [item.deregistered, item.chat_room_closed_time, item.other_profile_image_full_path]);

  const active = useMemo(() => {
    if (item.deregistered || item.chat_room_closed_time) {
      return false;
    }

    return true;
  }, [item.deregistered, item.chat_room_closed_time]);

  const name = useMemo(() => {
    if (item.deregistered || item.chat_room_closed_time) {
      return '탈퇴한 회원';
    }

    return item.other_name;
  }, [item.deregistered, item.chat_room_closed_time, item.other_name]);

  return {
    lastMessage,
    latestMessageTimeText,
    unreadRenderCodition,
    unreadMessageCountText,
    profileImagePath,
    name,
    active,
  };
}
