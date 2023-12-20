import { useContext } from 'react';

import { DanjiSuggestsOrListingsDispatchContext } from '../provider/DanjiSuggestsOrListingsProvider';

export default function useDanjiSuggestsOrListingsDispatch() {
  return useContext(DanjiSuggestsOrListingsDispatchContext);
}
