import { KeyedMutator } from 'swr';

import { InfiniteScroll } from '@/components/atoms';

import { MySuggestRecommendsResponse, SuggestRecommendDetailList } from '@/services/my/types';

import ListItem from './ListItem';

type ListContentsProps = {
  list: SuggestRecommendDetailList[] | null;
  mutate: KeyedMutator<MySuggestRecommendsResponse[]>;
  onNext: () => void;
};

export default function ListContents({ list, mutate, onNext }: ListContentsProps) {
  return (
    <div tw="py-4">
      <InfiniteScroll onNext={onNext}>
        <div tw="flex flex-col gap-7">
          {list?.map((item) => (
            <ListItem key={item.recommender_id} item={item} mutate={mutate} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
