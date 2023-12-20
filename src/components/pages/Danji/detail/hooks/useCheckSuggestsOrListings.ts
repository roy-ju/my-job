import useDanjiSuggestsOrListingsStore from './useDanjiSuggestsOrListingsStore';

import { getSuggestOrListings } from '../utils';

export default function useCheckSuggestsOrListings() {
  const store = useDanjiSuggestsOrListingsStore();

  const type = getSuggestOrListings(store?.tab ?? 0);

  return { type };
}
