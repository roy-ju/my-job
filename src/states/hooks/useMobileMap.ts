import { useRecoilValue } from 'recoil';

import mobileMapAtom from '../atom/mobileMap';

export default function useMobileMap() {
  const map = useRecoilValue(mobileMapAtom);

  return map;
}
