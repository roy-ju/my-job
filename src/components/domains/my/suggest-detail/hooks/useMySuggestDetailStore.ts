import { useContext } from 'react';

import { MySuggestDetailContext } from '../provider';

export default function useMySuggestDetailStore() {
  return useContext(MySuggestDetailContext);
}
