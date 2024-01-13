import { useRecoilValue } from 'recoil';

import mapAtom from '../atom/map';

export default function useMap() {
  const map = useRecoilValue(mapAtom);
  return map;
}
