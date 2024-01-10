import { MobileContainer } from '@/components/atoms';

import { ChatRoomList as ChatRoomListTemplate } from '@/components/templates';

import { MobGlobalNavigation } from '@/components/organisms';

import useSyncronizer from '@/states/syncronizer';

import useChatRoomList from './useChatRoomList';

export default function ChatRoomList() {
  const { chatRoomList, isLoading, handleClickListItem, handleClickSuggestForm } = useChatRoomList();

  const { unreadChatCount } = useSyncronizer();

  return (
    <MobileContainer bottomNav={<MobGlobalNavigation index={3} unreadChatCount={unreadChatCount} />}>
      <ChatRoomListTemplate
        list={chatRoomList}
        isLoading={isLoading}
        onClickListItem={handleClickListItem}
        onClickSuggestForm={handleClickSuggestForm}
      />
    </MobileContainer>
  );
}
