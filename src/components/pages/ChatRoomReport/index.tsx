import { memo } from 'react';

import { ChatRoomReportProvider } from './provider';

import { ChatRoomReport } from './components/template';

export default memo(() => (
  <ChatRoomReportProvider>
    <ChatRoomReport />
  </ChatRoomReportProvider>
));
