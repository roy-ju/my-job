import { InfiniteScroll } from '@/components/atoms';

import DanjiListingsCard from '@/components/organisms/danji/DanjiListingsCard';

import { DanjiListingListItem } from '@/services/danji/types';

type ListProps = {
  list: DanjiListingListItem[];
  onNext: () => void;
  handleClickItem: (id: number, buyOrRent: number) => void;
};

export default function List({ list, onNext, handleClickItem }: ListProps) {
  return (
    <div tw="py-2 flex-1 min-h-0 overflow-auto">
      <InfiniteScroll tw="pt-0 flex-1 min-h-0 overflow-auto" onNext={onNext}>
        {list.map((item, index) => (
          <DanjiListingsCard
            key={item.listing_id}
            item={item}
            isFirst={index === 0}
            isLast={list.length - 1 === index}
            onClick={() => handleClickItem(item.listing_id, item.buy_or_rent)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
