import { useContext } from 'react';
import { MySuggestDetailContext } from '../provider/MySuggestDetailProvider';

export default function useMySuggestDetailStore() {
  return useContext(MySuggestDetailContext);
}
