import tw, { styled } from 'twin.macro';

import ListItem from './ListItem';

import { ChatRoomListItem as ChatRoomListItemType } from './types';

type ListProps = { list: ChatRoomListItemType[]; handleClickListItem?: (id: number) => void };

const ListContainer = styled.div`
  ${tw`max-h-full min-h-0 overflow-y-auto`}
  & > div:not(:last-child) {
    ${tw`border-b border-gray-300`}
  }
`;

export default function List({ list, handleClickListItem }: ListProps) {
  return (
    <div tw="flex-1 min-h-0">
      <ListContainer>
        {list.map((item) => {
          if (item.lastMessage.includes(process.env.NEXT_PUBLIC_NEGOCIO_CHAT_PHOTO)) {
            return (
              <ListItem
                key={item.id}
                item={item}
                lastMessage="(사진)"
                onClick={() => {
                  handleClickListItem?.(item.id);
                }}
              />
            );
          }

          if (item.lastMessage.includes(process.env.NEXT_PUBLIC_NAVER_MAP_URL)) {
            return (
              <ListItem
                key={item.id}
                item={item}
                lastMessage="(장소공유)"
                onClick={() => {
                  handleClickListItem?.(item.id);
                }}
              />
            );
          }

          return (
            <ListItem
              key={item.id}
              item={item}
              lastMessage={item.lastMessage}
              onClick={() => {
                handleClickListItem?.(item.id);
              }}
            />
          );
        })}
      </ListContainer>
    </div>
  );
}
