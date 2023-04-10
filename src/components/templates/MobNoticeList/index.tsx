import { InfiniteScroll } from '@/components/atoms';
import { NoticeListItem } from '@/components/organisms';

export interface INoticeListItem {
  id: number;
  title: string;
  createdTime: string;
}

export interface NoticeListProps {
  notices: INoticeListItem[];
  onClickItem?: (id: number) => void;
  onNext?: () => void;
}

export default function MobNoticeList({ notices, onClickItem, onNext }: NoticeListProps) {
  return (
    <div tw="flex flex-col mt-[3.5rem]">
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
