import { InfiniteScroll } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { NoticeListItem } from '@/components/organisms';

export interface INoticeListItem {
  id: number;
  title: string;
  createdTime: string;
}

export interface NoticeListProps {
  notices: INoticeListItem[];
  onClickBack?: () => void;
  onClickItem?: (id: number) => void;
  onNext?: () => void;
}

export default function NoticeList({ notices, onClickBack, onClickItem, onNext }: NoticeListProps) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>공지사항</NavigationHeader.Title>
      </NavigationHeader>
      <InfiniteScroll tw="pt-1 flex-1 min-h-0 overflow-auto" onNext={onNext}>
        {notices.map((item) => (
          <NoticeListItem
            key={item.id}
            title={item.title}
            createdTime={item.createdTime}
            onClick={() => onClickItem?.(item.id)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
