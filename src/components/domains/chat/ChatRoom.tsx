import Container from '@/components/atoms/Container';

import ChatRoomOrganism from './room';

import useClientChatRoomDetailData from './room/hooks/useClientChatRoomDetailData';

import useChatRoomStore from './room/hooks/useChatRoomStore';

import useClientWebsocket from './room/hooks/useClientWebsocket';

export default function ChatRoom() {
  useClientChatRoomDetailData();

  const store = useChatRoomStore();

  const { handleSendMessage } = useClientWebsocket();

  if (store?.renderCondition !== 'success') return null;

  return (
    <Container tw="relative">
      <ChatRoomOrganism.Header />
      <ChatRoomOrganism.SubHeader />
      <ChatRoomOrganism.Messages />
      <ChatRoomOrganism.SendMessage handleSendMessage={handleSendMessage} />
      <ChatRoomOrganism.Popups handleSendMessage={handleSendMessage} />
    </Container>
  );
}
