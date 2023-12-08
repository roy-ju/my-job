import { useContext } from 'react';

import { ChatRoomReportContext } from '../provider/ChatRoomReportProvider';

export default function useChatRoomReportStore() {
  return useContext(ChatRoomReportContext);
}
