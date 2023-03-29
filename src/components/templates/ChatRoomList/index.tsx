import { Loading, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ChatRoomGuide, ChatRoomListItem, ChatRoomListNoData } from '@/components/organisms';
import { StaticImageData } from 'next/image';
import tw, { styled } from 'twin.macro';

const ListContainer = styled.div`
  ${tw`max-h-full min-h-0 overflow-y-auto`}
  & > div {
    ${tw`border-b border-gray-100`}
  }
`;

interface IChatRoomListItem {
  title: string;
  chatRoomType: string;
  agentDescription: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessageCount: number;
  profileImagePath: string | StaticImageData;
  listingStatus: string;
  id: number;
  active: boolean;
}

interface ChatRoomListProps {
  list: IChatRoomListItem[];
  onClickListItem?: (chatRoomID: number) => void;
  isLoading: boolean;
}

function List({ list, onClickListItem }: Omit<ChatRoomListProps, 'isLoading'>) {
  return (
    <div tw="flex-1 min-h-0">
      <ListContainer>
        {list.map((item) => (
          <ChatRoomListItem
            key={item.id}
            onClick={() => {
              onClickListItem?.(item.id);
            }}
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

function NoData() {
  return (
    <div tw="flex-1">
      <div tw="pt-12 pb-10">
        <ChatRoomListNoData />
      </div>
      <Separator />
      <ChatRoomGuide />
    </div>
  );
}

export default function ChatRoomList({ list, isLoading, onClickListItem }: ChatRoomListProps) {
  const renderList = () => {
    if (isLoading) return <Loading tw="text-center mt-10" />;
    if (list.length > 0) return <List list={list} onClickListItem={onClickListItem} />;
    return <NoData />;
  };

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>문의목록</NavigationHeader.Title>
      </NavigationHeader>
      {renderList()}
    </div>
  );
}
