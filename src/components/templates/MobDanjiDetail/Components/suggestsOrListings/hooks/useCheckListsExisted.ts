import { useMemo } from 'react';

import { DanjiListingListItem, DanjiSuggestListItem } from '@/services/danji/types';

import { isExistedItems } from '@/utils/isExistedItems';

export default function useCheckListsExisted({
  suggestList,
  listingList,
}: {
  suggestList: DanjiSuggestListItem[];
  listingList: DanjiListingListItem[];
}) {
  const isExistedSuggest = useMemo(() => isExistedItems<DanjiSuggestListItem>(suggestList), [suggestList]);

  const isExistedListings = useMemo(() => isExistedItems<DanjiListingListItem>(listingList), [listingList]);

  return { isExistedSuggest, isExistedListings };
}
