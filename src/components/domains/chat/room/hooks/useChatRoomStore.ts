import { useContext } from 'react';

import { ChatRoomContext } from '../provider/ChatRoomProvider';

export default function useChatRoomStore() {
  return useContext(ChatRoomContext);
}
