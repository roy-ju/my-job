import useChatRoomStore from '../../hooks/useChatRoomStore';

import useClientChatRoomDetailData from '../../hooks/useClientChatRoomDetailData';

import useClientWebsocket from '../../hooks/useClientWebsocket';

import ChatRoomOrganism from '../organisms';

export default function ChatRoom() {
  useClientChatRoomDetailData();

  const store = useChatRoomStore();

  const { handleSendMessage } = useClientWebsocket();

  if (store?.renderCondition !== 'success') return null;

  return (
    <div tw="flex flex-col h-full relative">
      <ChatRoomOrganism.Header />
      <ChatRoomOrganism.SubHeader />
      <ChatRoomOrganism.Messages />
      <ChatRoomOrganism.SendMessage handleSendMessage={handleSendMessage} />
      <ChatRoomOrganism.Popups handleSendMessage={handleSendMessage} />
    </div>
  );
}
