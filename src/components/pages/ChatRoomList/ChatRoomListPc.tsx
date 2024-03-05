import { memo } from 'react';

import ChatRoomList from '@/components/domains/chat/ChatRoomList';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function ChatRoomListPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ChatRoomList />
    </Panel>
  );
}

export default memo(ChatRoomListPc);
