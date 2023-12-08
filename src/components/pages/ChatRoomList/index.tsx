import { memo } from 'react';

import { ChatRoomListProvider } from './provider';

import { ChatRoomList } from './components/template';

export default memo(() => (
  <ChatRoomListProvider>
    <ChatRoomList />
  </ChatRoomListProvider>
));
