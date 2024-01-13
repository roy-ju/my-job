import { atom } from 'recoil';

import { v1 } from 'uuid';

type MobileDanjiMapTypeAtom = {
  mapType: string;
  panoCenter?: { lat: number; lng: number };
};

const mobileDanjiMapAtom = atom<MobileDanjiMapTypeAtom>({
  key: `mobileDanjiMapAtom/${v1()}`,
  default: { mapType: 'map', panoCenter: undefined },
  dangerouslyAllowMutability: true,
});

export default mobileDanjiMapAtom;
