import { NavigationHeader } from '@/components/molecules';
import { NoticeListItem } from '@/components/organisms';

export interface INoticeListItem {
  id: number;
  title: string;
  createdTime: string;
}

export interface NoticeListProps {
  notices: INoticeListItem[];
  onClickItem?: (id: number) => void;
}

export default function NoticeList({ notices, onClickItem }: NoticeListProps) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>공지사항</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="pt-1 flex-1 min-h-0 overflow-auto">
        {notices.map((item) => (
          <NoticeListItem
            key={item.id}
            title={item.title}
            createdTime={item.createdTime}
            onClick={() => onClickItem?.(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
