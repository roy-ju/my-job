import tw from 'twin.macro';

import { ChatRoomListItem } from '@/apis/chat/getChatRoomList';

import { Avatar } from '@/components/atoms';

import useChatRoomListItem from '../../hooks/useChatRoomListItem';

import useChatRoomListNavigateHandler from '../../hooks/useChatRoomListNavigateHandler';

type ListItemProps = { item: ChatRoomListItem };

export default function ListItem({ item }: ListItemProps) {
  const {
    lastMessage,
    latestMessageTimeText,
    unreadRenderCodition,
    unreadMessageCountText,
    profileImagePath,
    name,
    active,
  } = useChatRoomListItem(item);

  const { handleClickChatRoomListItem } = useChatRoomListNavigateHandler();

  return (
    <div>
      <button
        type="button"
        tw="h-20 w-full flex bg-white items-center text-start px-5 transition-colors "
        css={[active ? tw`hover:bg-gray-100` : tw`[opacity: 0.4]`]}
        value={item.chat_room_id}
        onClick={handleClickChatRoomListItem}
      >
        <div tw="flex flex-1 min-w-0">
          <Avatar size={44} alt={`${name} 프로필 사진`} src={profileImagePath} />

          <div tw="min-w-0 flex flex-col flex-1 ml-3 gap-1">
            <div tw="flex items-center justify-between gap-1">
              <div tw="overflow-hidden  flex items-center gap-1 line-clamp-1">
                <span tw="text-subhead_02 text-gray-1000">{name}</span>
              </div>
              <div tw="shrink-0 text-body_01 leading-5 text-gray-700 self-end">{latestMessageTimeText}</div>
            </div>

            <div tw="flex justify-between items-center">
              <div tw="text-body_02 overflow-hidden text-ellipsis whitespace-nowrap">{lastMessage}</div>

              {unreadRenderCodition && (
                <div
                  tw="h-5 inline-flex items-center justify-center text-white text-body_01 bg-red-800 ml-3"
                  css={[unreadRenderCodition === '1' ? tw`[border-radius: 100px]` : tw`[border-radius: 50%]`]}
                >
                  <span tw="min-w-[20px] text-center" css={[unreadRenderCodition === '1' && tw`px-1.5`]}>
                    {unreadMessageCountText}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}