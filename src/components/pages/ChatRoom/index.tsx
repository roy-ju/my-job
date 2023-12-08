import React, { memo } from 'react';

import { ChatRoomProvider } from './provider';

import { ChatRoom } from './components/template';

export default memo(() => (
  <ChatRoomProvider>
    <ChatRoom />
  </ChatRoomProvider>
));
