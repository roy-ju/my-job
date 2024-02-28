import { useMemo } from 'react';

import { DanjiListingListItem, DanjiSuggestListItem } from '@/services/danji/types';

import { sliceList } from '@/utils/sliceList';

import SuggestCardInDanji from '@/components/organisms/suggest/SuggestCardInDanji';

import DanjiListingsCard from '@/components/organisms/danji/DanjiListingsCard';

import DanjiListingsOrSuggestNodata from './DanjiListingsOrSuggestNodata';

import useCheckSuggestsOrListings from './hooks/useCheckSuggestsOrListings';

import useCheckListsExisted from './hooks/useCheckListsExisted';

type ListingItemListProps = {
  tab: number;
  suggestList: DanjiSuggestListItem[];
  listingList: DanjiListingListItem[];
  handleClickSuggestItem: (suggestID: number, mySuggest: boolean) => void;
  handleClickListingItem: (listingID: number, buyOrRent: number) => void;
};

export default function ListingItemList({
  tab,
  suggestList,
  listingList,
  handleClickSuggestItem,
  handleClickListingItem,
}: ListingItemListProps) {
  const { type } = useCheckSuggestsOrListings({ tab });

  const { isExistedListings, isExistedSuggest } = useCheckListsExisted({ suggestList, listingList });

  const renderType = useMemo(() => {
    if (type === 'suggest') {
      return isExistedSuggest ? 'list' : 'noData';
    }

    return isExistedListings ? 'list' : 'noData';
  }, [isExistedListings, isExistedSuggest, type]);

  const list = useMemo(() => {
    if (type === 'suggest') {
      return sliceList<DanjiSuggestListItem>(0, 3, suggestList);
    }

    return sliceList<DanjiListingListItem>(0, 3, listingList);
  }, [type, listingList, suggestList]);

  if (renderType === 'noData') return <DanjiListingsOrSuggestNodata type={type as 'listing' | 'suggest'} />;

  return (
    <>
      {type === 'suggest' ? (
        <div tw="flex flex-col gap-4 px-5 mt-4">
          {(list as DanjiSuggestListItem[]).map((item) => (
            <SuggestCardInDanji
              key={item.suggest_id}
              item={item}
              onClick={() => handleClickSuggestItem(item.suggest_id, item.my_suggest)}
            />
          ))}
        </div>
      ) : (
        <>
          {(list as DanjiListingListItem[]).map((item, index) => (
            <DanjiListingsCard
              key={item.listing_id}
              item={item}
              isFirst={index === 0}
              isLast={index === 2}
              onClick={() => handleClickListingItem(item.listing_id, item.buy_or_rent)}
            />
          ))}
        </>
      )}
    </>
  );
}
