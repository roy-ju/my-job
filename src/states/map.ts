import { NaverMap } from '@/lib/navermap';
import { atom, useRecoilValue } from 'recoil';
import { v1 } from 'uuid';

export const mapState = atom<NaverMap | null>({
  key: `negocio_map/${v1()}`,
  default: null,
  dangerouslyAllowMutability: true,
});

export default function useMap() {
  const map = useRecoilValue(mapState);
  return map;
}
