import { Moment } from '@/components/atoms';

export interface NoticeListItemProps {
  title?: string;
  createdTime?: string;
  onClick?: () => void;
}

export default function NoticeListItem({ title, createdTime, onClick }: NoticeListItemProps) {
  return (
    <div tw="border-b-gray-100 not-last-of-type:border-b bg-white hover:bg-gray-50">
      <button type="button" tw="w-full flex flex-col gap-2 p-5 items-stretch text-start" onClick={onClick}>
        <div tw="text-b2 leading-none overflow-hidden whitespace-nowrap text-ellipsis">{title}</div>
        <Moment format="YYYY.MM.DD" tw="text-info leading-3.5 text-gray-700">
          {createdTime}
        </Moment>
      </button>
    </div>
  );
}
