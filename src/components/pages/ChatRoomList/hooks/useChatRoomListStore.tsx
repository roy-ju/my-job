import { useContext } from 'react';

import { ChatRoomListContext } from '../provider/ChatRoomListProvider';

export default function useChatRoomListStore() {
  return useContext(ChatRoomListContext);
}
