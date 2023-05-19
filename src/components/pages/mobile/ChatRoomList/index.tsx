import { MobileContainer } from '@/components/atoms';
import { ChatRoomList as ChatRoomListTemplate } from '@/components/templates';
import { MobGlobalNavigation } from '@/components/organisms';
import useAPI_GetUnreadChatCount from '@/apis/chat/getUnreadNotificationCount';
import useChatRoomList from './useChatRoomList';

export default function ChatRoomList() {
  const { chatRoomList, isLoading, handleClickListItem } = useChatRoomList();

  const { count: unreadChatCount } = useAPI_GetUnreadChatCount();

  return (
    <MobileContainer bottomNav={<MobGlobalNavigation index={3} unreadChatCount={unreadChatCount} />}>
      <ChatRoomListTemplate list={chatRoomList} isLoading={isLoading} onClickListItem={handleClickListItem} />
    </MobileContainer>
  );
}
