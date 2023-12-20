import { useMemo } from 'react';

import { DanjiListingsListItem, DanjiSuggestListItem } from '@/services/danji/types';

import { isExistedItems } from '@/utils/isExistedItems';

import useDanjiSuggestsOrListingsStore from './useDanjiSuggestsOrListingsStore';

export default function useCheckListsExisted() {
  const store = useDanjiSuggestsOrListingsStore();

  const isExistedListings = useMemo(() => isExistedItems<DanjiListingsListItem>(store.listingsList.data), [store]);

  const isExistedSuggest = useMemo(() => isExistedItems<DanjiSuggestListItem>(store.suggestsList.data), [store]);

  return { isExistedListings, isExistedSuggest };
}
