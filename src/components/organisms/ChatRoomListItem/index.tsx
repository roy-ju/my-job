import { Avatar, Chip } from '@/components/atoms';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import { StaticImageData } from 'next/image';
import { formatLastMessageTime } from '@/utils/formatsTime';

interface ChatRoomListItemProps {
  profileImagePath: string | StaticImageData;
  name: string;
  typeTag: string;
  lastMessage: string;
  lastMessageTime: string;
  title: string;
  unreadMessageCount: number;
  onClick?: () => void;
}

export default function ChatRoomListItem({
  profileImagePath,
  typeTag,
  name,
  lastMessage,
  title,
  lastMessageTime,
  unreadMessageCount,
  onClick,
}: ChatRoomListItemProps) {
  const renderChatTag = () => {
    switch (typeTag) {
      case '구해요':
        return <Chip variant="yellowOrange">{typeTag}</Chip>;

      case '중개사':
        return <Chip variant="blue">{typeTag}</Chip>;

      case '집주인':
        return <Chip variant="nego">{typeTag}</Chip>;

      default:
        return null;
    }
  };

  return (
    <div>
      <button
        type="button"
        tw="h-37.5 w-full flex bg-white items-center  text-start px-5 transition-colors hover:bg-gray-100"
        onClick={onClick}
      >
        <div tw="flex flex-1 min-w-0">
          <Avatar size={44} alt={`${name} 프로필 사진`} src={profileImagePath || defaultAvatar} />
          <div tw="min-w-0 flex flex-col flex-1 ml-3">
            <div tw="flex items-center justify-between mb-[5px] gap-1">
              <div tw="overflow-hidden  flex items-center gap-1 line-clamp-1">
                {renderChatTag()} <span tw=" font-bold text-b2 text-gray-1000">{title}</span>
              </div>
              <div tw="shrink-0 text-info leading-5 text-gray-700 self-end">
                {formatLastMessageTime(lastMessageTime)}
                {/* <Moment format="calendar">{lastMessageTime}</Moment> */}
              </div>
            </div>
            <div tw="text-info leading-3.5 text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis mb-[5px] mr-8">
              {name}
            </div>
            <div tw="flex justify-between">
              <div tw="text-b2 max-h-11 mb-1 overflow-hidden text-ellipsis whitespace-pre-wrap [word-wrap: break-word] [display: -webkit-box] [-webkit-line-clamp: 2] [-webkit-box-orient: vertical]">
                {lastMessage}
              </div>
              {unreadMessageCount > 0 && (
                <div tw="h-4.5 inline-flex items-center justify-center text-white text-info leading-3.5 font-bold bg-red-700 rounded-bubble ml-4 mt-0.5">
                  <span tw="min-w-[20px] px-1 text-center">{unreadMessageCount > 99 ? '99+' : unreadMessageCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
