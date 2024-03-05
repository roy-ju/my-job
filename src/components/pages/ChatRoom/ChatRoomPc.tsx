import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import ChatRoom from '@/components/domains/chat/ChatRoom';

import { ChatRoomProvider } from '@/components/domains/chat/room/provider';

interface Props {
  panelWidth?: string;
}

function ChatRoomPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ChatRoomProvider>
        <ChatRoom />
      </ChatRoomProvider>
    </Panel>
  );
}

export default memo(ChatRoomPc);
