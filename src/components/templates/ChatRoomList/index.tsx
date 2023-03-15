import { Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ChatRoomGuide, ChatRoomListItem, ChatRoomListNoData } from '@/components/organisms';
import tw, { styled } from 'twin.macro';

const ListContainer = styled.div`
  ${tw`max-h-full min-h-0 overflow-y-auto`}
  & > button {
    ${tw`mx-5 border-b border-gray-100`}
  }
`;

interface ChatRoomListProps {
  list: any[];
}

function NoData() {
  return (
    <div tw="flex-1">
      <ChatRoomListNoData />
      <Separator />
      <ChatRoomGuide />
    </div>
  );
}

function List({ list }: ChatRoomListProps) {
  return (
    <div tw="flex-1 min-h-0">
      <ListContainer>
        {list.map((item) => (
          <ChatRoomListItem
            key={item.id}
            title={item.title}
            chatRoomType={item.chatRoomType}
            agentDescription={item.agentDescription}
            lastMessage={item.lastMessage}
            listingStatus={item.listingStatus}
            lastMessageTime={item.lastMessageTime}
            unreadMessageCount={item.unreadMessageCount}
            profileImagePath={item.profileImagePath}
            active={item.active}
          />
        ))}
      </ListContainer>
    </div>
  );
}

export default function ChatRoomList({ list }: ChatRoomListProps) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>문의목록</NavigationHeader.Title>
      </NavigationHeader>
      {list.length > 0 ? <List list={list} /> : <NoData />}
    </div>
  );
}
