import ChatRoomList from '@/components/domains/chat/ChatRoomList';

import MobileContainer from '@/components/atoms/MobileContainer';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import BottomGlobalNavigation from '@/components/organisms/global/BottomGlobalNavigation';

export default function ChatRoomListMobile() {
  const { unreadChatCount } = useSyncronizer();

  return (
    <MobileContainer bottomNav={<BottomGlobalNavigation index={3} unreadChatCount={unreadChatCount} />}>
      <ChatRoomList />
    </MobileContainer>
  );
}
