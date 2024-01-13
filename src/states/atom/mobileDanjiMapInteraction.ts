import { atom } from 'recoil';

import { v1 } from 'uuid';

import { DanjiDetailResponse } from '@/services/danji/types';

export type BtnState = {
  SW8?: boolean;
  HP8?: boolean;
  MT1?: boolean;
  CS2?: boolean;
  BK9?: boolean;
  PO3?: boolean;
};

type DanjiMapButtonStore = {
  isTrue: boolean;
  isTrueSchool: boolean;
  isTrueAround: boolean;
  isShowRoad: boolean;
  isShowMap: boolean;

  danjiAroundData: DanjiDetailResponse | undefined;
  danjiAroundDetailDefault: keyof BtnState;

  danjiSchoolID?: string;
  danjiAddress?: string;
  danjiPlace?: string;
  danjiAroundLat?: string;
  danjiAroundLng?: string;
};

const mobileDanjiInteractionAtom = atom<DanjiMapButtonStore>({
  key: `mobileDanjiInteractionAtom/${v1()}`,
  default: {
    isTrue: false,
    isTrueSchool: false,
    isTrueAround: false,
    isShowRoad: true,
    isShowMap: true,
    danjiAroundData: undefined,
    danjiAroundDetailDefault: 'HP8',

    danjiSchoolID: '',
    danjiAddress: '',
    danjiAroundLat: '',
    danjiAroundLng: '',
    danjiPlace: '',
  },
  dangerouslyAllowMutability: true,
});

export default mobileDanjiInteractionAtom;
