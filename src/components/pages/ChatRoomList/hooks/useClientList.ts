import { ChatRoomListItem } from '@/apis/chat/getChatRoomList';

import useChatRoomListStore from './useChatRoomListStore';

export default function useClientList() {
  const store = useChatRoomListStore();

  const list: ChatRoomListItem[] = store?.data?.list || [];

  return { list };
}
