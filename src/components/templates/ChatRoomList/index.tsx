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
  id: number;
  profileImagePath: string | StaticImageData;
  officeName: string;
  listingTitle: string;
  unreadMessageCount: number;
  lastMessage: string;
  lastMessageTime: string;
  additionalListingCount: number;
  active: boolean;
}

interface ChatRoomListProps {
  list: IChatRoomListItem[];
  onClickListItem?: (chatRoomID: number) => void;
  isLoading: boolean;
  onNavigateToMap?: () => void;
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
            officeName={item.officeName}
            lastMessage={item.lastMessage}
            listingTitle={item.listingTitle}
            lastMessageTime={item.lastMessageTime}
            additionalListingCount={item.additionalListingCount}
            unreadMessageCount={item.unreadMessageCount}
            profileImagePath={item.profileImagePath}
            active={item.active}
          />
        ))}
      </ListContainer>
    </div>
  );
}

function NoData({ onNavigateToMap }: { onNavigateToMap?: () => void }) {
  return (
    <div tw="flex-1">
      <div tw="pt-12 pb-10">
        <ChatRoomListNoData onNavigateToMap={onNavigateToMap} />
      </div>
      <Separator />
      <ChatRoomGuide />
    </div>
  );
}

export default function ChatRoomList({ list, isLoading, onClickListItem, onNavigateToMap }: ChatRoomListProps) {
  const renderList = () => {
    if (isLoading) return <Loading tw="text-center mt-10" />;
    if (list.length > 0) return <List list={list} onClickListItem={onClickListItem} />;
    return <NoData onNavigateToMap={onNavigateToMap} />;
  };

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>{list.length > 0 ? '채팅' : '문의목록'}</NavigationHeader.Title>
      </NavigationHeader>
      {renderList()}
    </div>
  );
}
