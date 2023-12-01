import { useContext } from 'react';

import { ChatRoomDisaptchContext } from '../provider/ChatRoomProvider';

export default function useChatRoomDispatch() {
  return useContext(ChatRoomDisaptchContext);
}
