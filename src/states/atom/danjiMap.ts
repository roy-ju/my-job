import { atom } from 'recoil';

import { v1 } from 'uuid';

type MobileDanjiMapTypeAtom = {
  mapType: string;
  panoCenter?: { lat: number; lng: number };
};

const mobileDanjiMapAtom = atom<MobileDanjiMapTypeAtom>({
  key: `mobile_danji_map_atom/${v1()}`,
  default: { mapType: 'map', panoCenter: undefined },
  dangerouslyAllowMutability: true,
});

export default mobileDanjiMapAtom;
