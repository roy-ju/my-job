import { atom } from 'recoil';

import { v1 } from 'uuid';

import { NaverMap } from '@/lib/navermap';

const mobileMapAtom = atom<NaverMap | null>({
  key: `negocio_mobile_map/${v1()}`,
  default: null,
  dangerouslyAllowMutability: true,
});

export default mobileMapAtom;
