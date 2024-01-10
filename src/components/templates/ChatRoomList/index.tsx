import { Loading } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ChatRoomListItem, ChatRoomListNoData } from '@/components/organisms';
import { StaticImageData } from 'next/image';
import tw, { styled } from 'twin.macro';

const ListContainer = styled.div`
  ${tw`max-h-full min-h-0 overflow-y-auto`}
  & > div:not(:last-child) {
    ${tw`border-b border-gray-300`}
  }
`;

interface IChatRoomListItem {
  id: number;
  chatRoomType: number;
  profileImagePath: string | StaticImageData;
  name: string;
  unreadMessageCount: number;
  lastMessage: string;
  lastMessageTime: string;
  active: boolean;
}

interface ChatRoomListProps {
  list: IChatRoomListItem[];
  onClickListItem?: (chatRoomID: number) => void;
  onClickSuggestForm?: () => void;
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
                name={item.name}
                lastMessage="(사진)"
                lastMessageTime={item.lastMessageTime}
                unreadMessageCount={item.unreadMessageCount}
                profileImagePath={item.profileImagePath}
                active={item.active}
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
                name={item.name}
                lastMessage="(장소공유)"
                lastMessageTime={item.lastMessageTime}
                unreadMessageCount={item.unreadMessageCount}
                profileImagePath={item.profileImagePath}
                active={item.active}
              />
            );
          }
          return (
            <ChatRoomListItem
              key={item.id}
              onClick={() => {
                onClickListItem?.(item.id);
              }}
              name={item.name}
              lastMessage={item.lastMessage}
              lastMessageTime={item.lastMessageTime}
              unreadMessageCount={item.unreadMessageCount}
              profileImagePath={item.profileImagePath}
              active={item.active}
            />
          );
        })}
      </ListContainer>
    </div>
  );
}

function NoData({ onClickSuggestForm }: { onClickSuggestForm?: () => void }) {
  return (
    <div tw="flex-1">
      <div tw="pt-12 pb-10">
        <ChatRoomListNoData onClickSuggestForm={onClickSuggestForm} />
      </div>
    </div>
  );
}

export default function ChatRoomList({ list, isLoading, onClickListItem, onClickSuggestForm }: ChatRoomListProps) {
  const renderList = () => {
    if (isLoading) return <Loading tw="text-center mt-10" />;
    if (list.length > 0) return <List list={list} onClickListItem={onClickListItem} />;
    return <NoData onClickSuggestForm={onClickSuggestForm} />;
  };

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>채팅</NavigationHeader.Title>
      </NavigationHeader>
      {renderList()}
    </div>
  );
}
