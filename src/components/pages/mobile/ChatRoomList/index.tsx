import { MobileContainer } from '@/components/atoms';
import { ChatRoomList as ChatRoomListTemplate } from '@/components/templates';
import { MobGlobalNavigation } from '@/components/organisms';
import useChatRoomList from './useChatRoomList';

export default function ChatRoomList() {
  const { chatRoomList, isLoading, handleClickListItem } = useChatRoomList();

  return (
    <MobileContainer bottomNav={<MobGlobalNavigation index={3} />}>
      <ChatRoomListTemplate list={chatRoomList} isLoading={isLoading} onClickListItem={handleClickListItem} />
    </MobileContainer>
  );
}
