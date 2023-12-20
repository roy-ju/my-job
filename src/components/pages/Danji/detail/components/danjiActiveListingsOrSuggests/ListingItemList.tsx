import React, { memo } from 'react';

import { DanjiListingsListItem, DanjiSuggestListItem } from '@/services/danji/types';

import { ListingItem } from '@/components/organisms';

import DanjiListingsOrSuggestNodata from './DanjiListingsOrSuggestNodata';

import useDanjiDetailStore from '../../hooks/useDanjiDetailStore';

type ListingItemListProps = {
  type: 'suggest' | 'listing';
  renderType: 'noData' | 'list';
  list: DanjiListingsListItem[] | DanjiSuggestListItem[];
  handleRouterSuggestDetail: (danjiID: number, suggestID: number, mySuggest: boolean) => void;
  handleRouterListingDetail: (danjiID: number, listingID: number, buyOrRent: number) => void;
};

function ListingItemList({
  type,
  renderType,
  list,
  handleRouterSuggestDetail,
  handleRouterListingDetail,
}: ListingItemListProps) {
  const store = useDanjiDetailStore();

  const danjiID = store?.danji.danji_id ?? 0;

  if (renderType === 'noData') return <DanjiListingsOrSuggestNodata type={type} />;

  return (
    <ListingItem>
      {type === 'suggest' ? (
        <div tw="flex flex-col gap-4 px-5 mt-4">
          {(list as DanjiSuggestListItem[]).map((item) => (
            <ListingItem.TypeTwo
              key={item.suggest_id}
              item={item}
              onClick={() => handleRouterSuggestDetail(danjiID, item.suggest_id, item.my_suggest)}
            />
          ))}
        </div>
      ) : (
        <>
          {(list as DanjiListingsListItem[]).map((item, index) => (
            <ListingItem.TypeOne
              key={item.listing_id}
              item={item}
              isFirst={index === 0}
              isLast={index === 2}
              onClick={() => handleRouterListingDetail(danjiID, item.listing_id, item.buy_or_rent)}
            />
          ))}
        </>
      )}
    </ListingItem>
  );
}

export default memo(ListingItemList);
