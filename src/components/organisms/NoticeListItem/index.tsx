import { Moment } from '@/components/atoms';

export interface NoticeListItemProps {
  title?: string;
  createdTime?: string;
  onClick?: () => void;
}

export default function NoticeListItem({ title, createdTime, onClick }: NoticeListItemProps) {
  return (
    <div tw="border-t-white not-first-of-type:border-t-gray-100 bg-white hover:bg-gray-50">
      <button type="button" tw="border-t-inherit w-full px-5 items-stretch text-start" onClick={onClick}>
        <div tw="border-t border-t-inherit flex flex-col gap-2 py-5">
          <div tw="text-b2 leading-none overflow-hidden whitespace-nowrap text-ellipsis">{title}</div>
          <Moment format="YYYY.MM.DD" tw="text-info leading-3.5 text-gray-700">
            {createdTime}
          </Moment>
        </div>
      </button>
    </div>
  );
}
