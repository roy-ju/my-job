/* eslint-disable react/no-danger */
import { Moment } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';

export interface NoticeDetailProps {
  title: string;
  createdTime: string;
  descriptionHTML: string;
  onClickGoToList?: () => void;
}

export default function NoticeDetail({ title, createdTime, descriptionHTML, onClickGoToList }: NoticeDetailProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>{title}</NavigationHeader.Title>
        <NavigationHeader.Button tw="text-info underline" onClick={onClickGoToList}>
          목록보기
        </NavigationHeader.Button>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto py-6 px-5">
        <div tw="flex flex-col gap-2 mb-5">
          <div tw="text-b2 leading-5 break-words">{title}</div>
          <Moment format="YYYY.MM.DD" tw="text-info leading-3.5 text-gray-700">
            {createdTime}
          </Moment>
        </div>
        <div tw="text-b2" dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
      </div>
    </div>
  );
}
