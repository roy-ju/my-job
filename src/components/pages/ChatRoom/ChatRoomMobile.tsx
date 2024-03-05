import { MobileContainer } from '@/components/atoms';

import ChatRoom from '@/components/domains/chat/ChatRoom';

import { ChatRoomProvider } from '@/components/domains/chat/room/provider';

export default function FaqMobile() {
  return (
    <MobileContainer>
      <ChatRoomProvider>
        <ChatRoom />
      </ChatRoomProvider>
    </MobileContainer>
  );
}
