import { InfiniteScroll } from '@/components/atoms';

import ListItem from './ListItem';

import useMySuggestDetailStore from './hooks/useMySuggestDetailStore';

type ListProps = { depth?: number };

export default function List({ depth }: ListProps) {
  const value = useMySuggestDetailStore();

  if (!value) return null;

  return (
    <div tw="py-7 px-5">
      <InfiniteScroll onNext={value?.onNext}>
        <div tw="flex flex-col gap-7">
          {value?.suggestRecommendsData?.map((item) => (
            <ListItem key={item.recommender_id} item={item} depth={depth} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
