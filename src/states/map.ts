import { atom, useRecoilValue } from 'recoil';

import { v1 } from 'uuid';

import { NaverMap } from '@/lib/navermap';

export interface IMapState {
  naverMap?: NaverMap;
}

export const mapState = atom<IMapState>({
  key: `negocio_map/${v1()}`,
  default: {},
  dangerouslyAllowMutability: true,
});

export default function useMap() {
  const map = useRecoilValue(mapState);
  return map;
}
