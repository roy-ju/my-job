import { atom } from 'recoil';

import { v1 } from 'uuid';

import { DanjiDetailResponse } from '@/services/danji/types';

interface CommonMarker {
  id: string;
  lat: number;
  lng: number;
  onClick?: () => void;
}

interface SchoolMarker extends CommonMarker {
  type: string;
  name: string;
}

interface SelectedSchool {
  id?: string;
}

interface SelectedAround {
  id?: string;
  addressName?: string;
}

interface AroundMarker extends CommonMarker {
  type: string;
  place?: string | string[];
  duplicatedCount?: number;
  distance?: string;
  addressName?: string;
}

export interface AroundMarkers {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  place_name: string;
  x: string;
  y: string;
  id: string;
  phone: string;
  road_address_name: string;
  place_url: string;
}

const danjiInteractionAtom = atom<{
  activeCategory: string;
  school: boolean;
  around: boolean;
  danjiData?: DanjiDetailResponse;
  selectedSchool?: SelectedSchool;
  selectedAround?: SelectedAround;
  selectedSchoolMarker?: SchoolMarker;
  selectedAroundMarker?: AroundMarker;
  schoolMarkers: SchoolMarker[];
  aroundMarkers: AroundMarkers[];
  danjiAroundPlaceName?: string;
}>({
  key: `danjiInteractionAtom/${v1()}`,
  default: {
    activeCategory: 'HP8',
    school: false,
    around: false,
    danjiData: undefined,
    selectedSchoolMarker: undefined,
    selectedAroundMarker: undefined,
    schoolMarkers: [],
    aroundMarkers: [],
    danjiAroundPlaceName: undefined,
  },
  dangerouslyAllowMutability: true,
});

export default danjiInteractionAtom;
