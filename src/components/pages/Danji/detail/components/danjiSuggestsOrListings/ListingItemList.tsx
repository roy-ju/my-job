import { memo, useMemo } from 'react';

import { ListingItem } from '@/components/organisms';

import { DanjiListingsListItem, DanjiSuggestListItem } from '@/services/danji/types';

import { sliceList } from '@/utils/sliceList';

import DanjiListingsOrSuggestNodata from './DanjiListingsOrSuggestNodata';

import useDanjiDetailStore from '../../hooks/useDanjiDetailStore';

import useCheckSuggestsOrListings from '../../hooks/useCheckSuggestsOrListings';

import useCheckListsExisted from '../../hooks/useCheckListsExisted';

import useDanjiSuggestsOrListingsStore from '../../hooks/useDanjiSuggestsOrListingsStore';

type ListingItemListProps = {
  handleClickSuggestItem: (danjiID: number, suggestID: number, mySuggest: boolean) => void;
  handleClickListingItem: (danjiID: number, listingID: number, buyOrRent: number) => void;
};

function ListingItemList({ handleClickSuggestItem, handleClickListingItem }: ListingItemListProps) {
  const store = useDanjiDetailStore();

  const suggestsOrListingsStore = useDanjiSuggestsOrListingsStore();

  const { type } = useCheckSuggestsOrListings();

  const { isExistedListings, isExistedSuggest } = useCheckListsExisted();

  const renderType = useMemo(() => {
    if (type === 'suggest') {
      return isExistedSuggest ? 'list' : 'noData';
    }

    return isExistedListings ? 'list' : 'noData';
  }, [isExistedListings, isExistedSuggest, type]);

  const list = useMemo(() => {
    if (type === 'suggest') {
      return sliceList<DanjiSuggestListItem>(0, 3, suggestsOrListingsStore.suggestsList.data);
    }

    return sliceList<DanjiListingsListItem>(0, 3, suggestsOrListingsStore.listingsList.data);
  }, [suggestsOrListingsStore.listingsList.data, suggestsOrListingsStore.suggestsList.data, type]);

  const danjiID = store?.danji.danji_id ?? 0;

  if (renderType === 'noData') return <DanjiListingsOrSuggestNodata type={type as 'listing' | 'suggest'} />;

  return (
    <ListingItem>
      {type === 'suggest' ? (
        <div tw="flex flex-col gap-4 px-5 mt-4">
          {(list as DanjiSuggestListItem[]).map((item) => (
            <ListingItem.TypeTwo
              key={item.suggest_id}
              item={item}
              onClick={() => handleClickSuggestItem(danjiID, item.suggest_id, item.my_suggest)}
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
              onClick={() => handleClickListingItem(danjiID, item.listing_id, item.buy_or_rent)}
            />
          ))}
        </>
      )}
    </ListingItem>
  );
}

export default memo(ListingItemList);
