import { MobileContainer } from '@/components/atoms';

import { MobGlobalNavigation } from '@/components/organisms';

import ChatRoomList from '@/components/domains/chat/ChatRoomList';

import useSyncronizer from '@/states/hooks/useSyncronizer';

export default function ChatRoomListMobile() {
  const { unreadChatCount } = useSyncronizer();

  return (
    <MobileContainer bottomNav={<MobGlobalNavigation index={3} unreadChatCount={unreadChatCount} />}>
      <ChatRoomList />
    </MobileContainer>
  );
}
