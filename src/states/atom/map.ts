import { atom } from 'recoil';

import { v1 } from 'uuid';

import { NaverMap } from '@/lib/navermap';

export interface MapAtom {
  naverMap?: NaverMap;
}

const mapAtom = atom<MapAtom>({
  key: `negocio_map_atom/${v1()}`,
  default: {},
  dangerouslyAllowMutability: true,
});

export default mapAtom;
