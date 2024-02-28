import { InfiniteScroll } from '@/components/atoms';

import SuggestCardInDanji from '@/components/organisms/suggest/SuggestCardInDanji';

import { DanjiSuggestListItem } from '@/services/danji/types';

type ListProps = {
  list: DanjiSuggestListItem[];
  onNext: () => void;
  handleClickItem: (suggestId: number, mySuggest: boolean) => void;
};

export default function List({ list, onNext, handleClickItem }: ListProps) {
  return (
    <div tw="py-2 px-5 flex-1 min-h-0 overflow-auto">
      <InfiniteScroll tw="pt-0 flex-1 min-h-0 overflow-auto flex flex-col gap-4" onNext={onNext}>
        {list.map((item) => (
          <SuggestCardInDanji
            key={item.suggest_id}
            item={item}
            onClick={() => handleClickItem(item.suggest_id, item.my_suggest)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
