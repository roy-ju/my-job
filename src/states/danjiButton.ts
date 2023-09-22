/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import getDanjiSchoolsMarker from '@/apis/map/danjiMapSchools';

import { atom, useRecoilState } from 'recoil';
import { v1 } from 'uuid';

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

interface AroundMarkers {
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

export const schoolAroundState = atom<{
  activeCategory: string;
  school: boolean;
  around: boolean;
  danjiData?: GetDanjiDetailResponse;
  selectedSchool?: SelectedSchool;
  selectedAround?: SelectedAround;
  selectedSchoolMarker?: SchoolMarker;
  selectedAroundMarker?: AroundMarker;
  schoolMarkers: SchoolMarker[];
  aroundMarkers: AroundMarkers[];
}>({
  key: `negocio_danji_interaction_map/${v1()}`,
  default: {
    activeCategory: 'HP8',
    school: false,
    around: false,
    danjiData: undefined,
    selectedSchoolMarker: undefined,
    selectedAroundMarker: undefined,
    schoolMarkers: [],
    aroundMarkers: [],
  },
  dangerouslyAllowMutability: true,
});

const schoolTypes = [
  { type: '1', name: 'elementary' },
  { type: '2', name: 'middle' },
  { type: '3', name: 'high' },
];

export default function useDanjiInteraction({ danjiData }: { danjiData?: GetDanjiDetailResponse }) {
  const [state, setState] = useRecoilState(schoolAroundState);

  const makeSchoolOn = async (callback?: () => unknown) => {
    let newSchoolMarkers: SchoolMarker[] = [];

    // setState((prev) => ({ ...prev, school: true }));
    // setState((prev) => ({ ...prev, danjiData }));

    if (danjiData) {
      window.Negocio.callbacks.selectSchoolInteraction({
        id: `danjiMarker:${danjiData.danji_id}${danjiData.type}`,
        lat: danjiData.lat,
        lng: danjiData.long,
      });

      const schoolPromises = schoolTypes.map((schoolType) =>
        getDanjiSchoolsMarker({
          danjiId: danjiData?.danji_id,
          realestateType: danjiData?.type,
          schoolTypes: schoolType.type,
        }),
      );

      const schoolResults = await Promise.all(schoolPromises);

      schoolResults.forEach((schoolRes, index) => {
        if (schoolRes?.list) {
          const schools = schoolRes.list.map((item) => ({
              id: item.school_id,
              name: item.school_type === '중학교' ? item.school_name : item.school_name.replace('등학교', ''),
              lat: item.lat,
              lng: item.long,
              type: schoolTypes[index].name,
            }));

          newSchoolMarkers.push(...schools);
        }
      });

      setState((prev) => ({
        ...prev,
        school: true,
        danjiData,
        schoolMarkers: [...prev.schoolMarkers, ...newSchoolMarkers],
      }));

console.log(newSchoolMarkers)

      callback?.();

      // if (danjiData) {
      //   window.Negocio.callbacks.selectSchoolInteraction({
      //     id: `danjiMarker:${danjiData.danji_id}${danjiData.type}`,
      //     lat: danjiData.lat,
      //     lng: danjiData.long,
      //   });

      //   const elementrySchoolRes = await getDanjiSchoolsMarker({
      //     danjiId: danjiData?.danji_id,
      //     realestateType: danjiData?.type,
      //     schoolTypes: '1',
      //   });

      //   if (elementrySchoolRes?.list) {
      //     setState((prev) => {
      //       const ele = elementrySchoolRes.list.map((item) => ({
      //         id: item.school_id,
      //         name: item.school_name.replace('등학교', ''),
      //         lat: item.lat,
      //         lng: item.long,
      //         type: 'elementary',
      //       }));
      //       return {
      //         ...prev,
      //         schoolMarkers: [...prev.schoolMarkers, ...ele],
      //       };
      //     });
      //   }

      //   const middleSchoolRes = await getDanjiSchoolsMarker({
      //     danjiId: danjiData?.danji_id,
      //     realestateType: danjiData?.type,
      //     schoolTypes: '2',
      //   });

      //   if (middleSchoolRes?.list) {
      //     setState((prev) => {
      //       const middle = middleSchoolRes.list.map((item) => ({
      //         id: item.school_id,
      //         name: item.school_name,
      //         lat: item.lat,
      //         lng: item.long,
      //         type: 'middle',
      //       }));
      //       return {
      //         ...prev,
      //         schoolMarkers: [...prev.schoolMarkers, ...middle],
      //       };
      //     });
      //   }

      //   const highSchoolRes = await getDanjiSchoolsMarker({
      //     danjiId: danjiData?.danji_id,
      //     realestateType: danjiData?.type,
      //     schoolTypes: '3',
      //   });

      //   if (highSchoolRes?.list) {
      //     setState((prev) => {
      //       const high = highSchoolRes.list.map((item) => ({
      //         id: item.school_id,
      //         name: item.school_name.replace('등학교', ''),
      //         lat: item.lat,
      //         lng: item.long,
      //         type: 'high',
      //       }));
      //       return {
      //         ...prev,
      //         schoolMarkers: [...prev.schoolMarkers, ...high],
      //       };
      //     });
      //   }
      // }
    }
  };

  const makeSchoolOff = () => {
    setState((prev) => ({
      ...prev,
      school: false,
      schoolMarkers: [],
      selectedSchool: {},
      selectedSchoolMarker: undefined,
    }));
  };

  const makeAroundOn = () => {
    setState((prev) => ({ ...prev, around: true }));
    setState((prev) => ({ ...prev, danjiData }));

    if (danjiData) {
      window.Negocio.callbacks.selectAroundInteraction({
        id: `danjiMarker:${danjiData.danji_id}${danjiData.type}`,
        lat: danjiData.lat,
        lng: danjiData.long,
      });
    }
  };

  const makeAroundOff = () => {
    setState((prev) => ({ ...prev, around: false, selectedAroundMarker: undefined }));
  };

  const makeCategory = (val: string) => {
    setState((prev) => ({ ...prev, activeCategory: val }));
  };

  const makeDataReset = () => {
    setState({
      activeCategory: 'HP8',
      school: false,
      around: false,
      danjiData: undefined,
      schoolMarkers: [],
      aroundMarkers: [],
      selectedSchool: {},
      selectedSchoolMarker: undefined,
      selectedAroundMarker: undefined,
    });
  };

  const makeSelectedSchool = (id: string) => {
    setState((prev) => ({ ...prev, selectedSchool: { id } }));
  };

  const makeSelectedSchoolDefault = () => {
    setState((prev) => ({ ...prev, selectedSchool: {} }));
  };

  const makeSelectedSchoolMarker = (value: SchoolMarker) => {
    setState((prev) => ({ ...prev, selectedSchoolMarker: value }));
  };

  const makeSelectedSchoolMarkerDefault = () => {
    setState((prev) => ({ ...prev, selectedSchoolMarker: undefined }));
  };

  const makeSelectedAround = (id: string, ad: string) => {
    setState((prev) => ({ ...prev, selectedAround: { id, addressName: ad } }));
  };

  const makeSelectedAroundDefault = () => {
    setState((prev) => ({ ...prev, selectedAround: {} }));
  };

  const makeSelectedAroundMarker = (value: AroundMarker) => {
    setState((prev) => ({ ...prev, selectedAroundMarker: value }));
  };

  const makeSelectedAroundMarkerDefault = () => {
    setState((prev) => ({ ...prev, selectedAroundMarker: undefined }));
  };

  const makeAroundMarker = (value: AroundMarkers[]) => {
    setState((prev) => ({ ...prev, aroundMarkers: value }));
  };

  const makeAroundMarkerDefault = () => {
    setState((prev) => ({ ...prev, aroundMarkers: [] }));
  };

  return {
    isSchoolOn: state.school,
    isAroundOn: state.around,
    schoolMarkers: state.schoolMarkers,
    danji: state.danjiData,
    activeCategory: state.activeCategory,
    makeSchoolOn,
    makeSchoolOff,
    makeAroundOn,
    makeAroundOff,
    makeCategory,
    makeDataReset,
    makeSelectedSchool,
    makeSelectedSchoolDefault,
    makeSelectedSchoolMarker,
    makeSelectedSchoolMarkerDefault,
    makeSelectedAround,
    makeSelectedAroundDefault,
    makeSelectedAroundMarker,
    makeSelectedAroundMarkerDefault,
    makeAroundMarker,
    makeAroundMarkerDefault,
  };
}
