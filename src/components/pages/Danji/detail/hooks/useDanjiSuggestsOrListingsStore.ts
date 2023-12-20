import { useContext } from 'react';

import { DanjiSuggestsOrListingsContext } from '../provider/DanjiSuggestsOrListingsProvider';

export default function useDanjiSuggestsOrListingsStore() {
  return useContext(DanjiSuggestsOrListingsContext);
}
