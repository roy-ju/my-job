import { useMemo } from 'react';

import { InfiniteScroll } from '@/components/atoms';

import useFetchNoticeList from '@/services/my/useFetchNoticeList';

import ListItem from './ListItem';

import useListItemHandler from './hooks/useListItemHandler';

export default function List() {
  const { data, increamentPageNumber: onNext } = useFetchNoticeList();

  const notices = useMemo(
    () =>
      data.map((item) => ({
        id: item.id,
        title: item.category ? `[${item.category}] ${item.title}` : item.title,
        created_time: item.created_time,
      })),
    [data],
  );

  const { handleClickListItem } = useListItemHandler();

  return (
    <InfiniteScroll tw="pt-1 flex-1 min-h-0 overflow-auto" onNext={onNext}>
      {notices.map((item) => (
        <ListItem key={item.id} item={item} handleClickItem={handleClickListItem} />
      ))}
    </InfiniteScroll>
  );
}
