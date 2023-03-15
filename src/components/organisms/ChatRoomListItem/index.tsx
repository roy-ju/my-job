import { Avatar, Chip, Moment } from '@/components/atoms';
import { StaticImageData } from 'next/image';

interface ChatRoomListItemProps {
  active: boolean;
  profileImagePath: string | StaticImageData;
  title: string;
  chatRoomType: string;
  agentDescription: string;
  lastMessage: string;
  listingStatus: string;
  lastMessageTime: string;
  unreadMessageCount: number;
}

export default function ChatRoomListItem({
  active,
  profileImagePath,
  title,
  chatRoomType,
  agentDescription,
  lastMessage,
  listingStatus,
  lastMessageTime,
  unreadMessageCount,
}: ChatRoomListItemProps) {
  return (
    <button type="button" tw="h-37.5 flex bg-white items-center text-start">
      <div tw="flex flex-1 min-w-0">
        <Avatar alt="alt" src={profileImagePath} active={active} />
        <div tw="min-w-0 flex flex-col flex-1 ml-2">
          <div tw="flex items-center mb-[5px] gap-1">
            <div tw="text-b2 text-gray-1000 font-bold leading-4 overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </div>
            <Chip>{chatRoomType}</Chip>
          </div>
          <div tw="text-info leading-3.5 text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis mb-[3px] mr-8">
            {agentDescription}
          </div>
          <div tw="flex justify-between">
            <div tw="text-b2 max-h-11 mb-1 overflow-hidden text-ellipsis whitespace-pre-wrap [word-wrap: break-word] [display: -webkit-box] [-webkit-line-clamp: 2] [-webkit-box-orient: vertical]">
              {lastMessage}
            </div>
            {unreadMessageCount > 0 && (
              <div tw="h-4.5 px-1.5 inline-flex items-center text-white text-info leading-3.5 font-bold bg-red-700 rounded-bubble ml-4 mt-0.5">
                {unreadMessageCount > 99 ? '99+' : unreadMessageCount}
              </div>
            )}
          </div>
          <div tw="flex items-center gap-1.5">
            <div tw="text-info leading-3.5 text-gray-700">{listingStatus}</div>
            <div tw="w-px h-2 bg-gray-300" />
            <div tw="text-info leading-3.5 text-gray-700">
              <Moment format="YYYY년 M월 D일">{lastMessageTime}</Moment>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
