import { Loading, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ChatRoomGuide, ChatRoomListItem, ChatRoomListNoData } from '@/components/organisms';
import { StaticImageData } from 'next/image';
import tw, { styled } from 'twin.macro';
import { ChatUserType } from '@/constants/enums';

const ListContainer = styled.div`
  ${tw`max-h-full min-h-0 overflow-y-auto`}
  & > div {
    ${tw`border-b border-gray-100`}
  }
`;

interface IChatRoomListItem {
  id: number;
  chatRoomType: number;
  profileImagePath: string | StaticImageData;
  officeName: string;
  listingTitle: string;
  unreadMessageCount: number;
  lastMessage: string;
  lastMessageTime: string;
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
        {list.map((item) => {
          if (item.lastMessage.includes(process.env.NEXT_PUBLIC_NEGOCIO_CHAT_PHOTO)) {
            return (
              <ChatRoomListItem
                key={item.id}
                onClick={() => {
                  onClickListItem?.(item.id);
                }}
                isSeller={item.chatRoomType === ChatUserType.Seller}
                officeName={item.officeName}
                lastMessage="(사진)"
                listingTitle={item.listingTitle}
                lastMessageTime={item.lastMessageTime}
                unreadMessageCount={item.unreadMessageCount}
                profileImagePath={item.profileImagePath}
              />
            );
          }

          if (item.lastMessage.includes(process.env.NEXT_PUBLIC_NAVER_MAP_URL)) {
            return (
              <ChatRoomListItem
                key={item.id}
                onClick={() => {
                  onClickListItem?.(item.id);
                }}
                isSeller={item.chatRoomType === ChatUserType.Seller}
                officeName={item.officeName}
                lastMessage="(장소공유)"
                listingTitle={item.listingTitle}
                lastMessageTime={item.lastMessageTime}
                unreadMessageCount={item.unreadMessageCount}
                profileImagePath={item.profileImagePath}
              />
            );
          }
          return (
            <ChatRoomListItem
              key={item.id}
              onClick={() => {
                onClickListItem?.(item.id);
              }}
              isSeller={item.chatRoomType === ChatUserType.Seller}
              officeName={item.officeName}
              lastMessage={item.lastMessage}
              listingTitle={item.listingTitle}
              lastMessageTime={item.lastMessageTime}
              unreadMessageCount={item.unreadMessageCount}
              profileImagePath={item.profileImagePath}
            />
          );
        })}
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
        <NavigationHeader.Title>중개사 채팅</NavigationHeader.Title>
      </NavigationHeader>
      {renderList()}
    </div>
  );
}
