import { useContext } from 'react';

import { DanjiDetailContext } from '../provider/DanjiDetailProvider';

export default function useDanjiDetailStore() {
  return useContext(DanjiDetailContext);
}
