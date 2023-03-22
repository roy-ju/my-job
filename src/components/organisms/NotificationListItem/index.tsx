import { Chip, Moment } from '@/components/atoms';
import tw from 'twin.macro';

interface NotificationListItemProps {
  title: string;
  message: string;
  listingTitle: string;
  createdTime: string;
  unread: boolean;
}

export default function NotificationListItem({
  unread,
  title,
  message,
  listingTitle,
  createdTime,
}: NotificationListItemProps) {
  return (
    <div>
      <button type="button" css={[tw`w-full px-5 bg-white text-start`, unread && tw`bg-gray-100`]}>
        <div tw="flex flex-col py-5">
          <div tw="flex items-center">
            <div tw="flex gap-1">
              <Chip>거래</Chip>
              <Chip>기타</Chip>
            </div>
            <Moment tw="ml-auto text-info leading-3.5 text-gray-700" format="YYYY.MM.DD">
              {createdTime}
            </Moment>
          </div>
          <div tw="text-info leading-3.5 text-gray-700 mt-4 whitespace-nowrap overflow-hidden text-ellipsis">
            {listingTitle}
          </div>
          <div tw="text-b2 leading-5 mt-2.5 overflow-hidden text-ellipsis whitespace-pre-wrap break-words [display: -webkit-box] [-webkit-line-clamp: 2] [-webkit-box-orient: vertical]">
            {title}
          </div>
          <div tw="text-info leading-4.5 text-gray-700 mt-1 break-words">{message}</div>
        </div>
      </button>
    </div>
  );
}
