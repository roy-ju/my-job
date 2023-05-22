/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import getDanjiSchoolsMarker from '@/apis/map/danjiMapSchools';
import { atom, useRecoilState } from 'recoil';
import { v1 } from 'uuid';
import useMap from './map';

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

export const schoolAroundState = atom<{
  school: boolean;
  around: boolean;
  danjiData?: GetDanjiDetailResponse;
  selectedSchool?: SelectedSchool;
  selectedSchoolMarker?: SchoolMarker;
  schoolMarkers: SchoolMarker[];
}>({
  key: `negocio_danji_interaction_map/${v1()}`,
  default: {
    school: false,
    around: false,
    danjiData: undefined,
    selectedSchoolMarker: undefined,
    schoolMarkers: [],
  },
  dangerouslyAllowMutability: true,
});

export default function useDanjiInteraction({ danjiData }: { danjiData?: GetDanjiDetailResponse }) {
  const [state, setState] = useRecoilState(schoolAroundState);

  const map = useMap();

  const makeSchoolOn = async () => {
    setState((prev) => ({ ...prev, school: true }));
    setState((prev) => ({ ...prev, danjiData }));

    if (danjiData) {
      window.Negocio.callbacks.selectSchoolInteraction({
        id: `danjiMarker:${danjiData.pnu}${danjiData.type}`,
        lat: danjiData.lat,
        lng: danjiData.long,
      });

      // map.naverMap?.morph({ lat: danjiData.lat, lng: danjiData.long }, 16);

      const elementrySchoolRes = await getDanjiSchoolsMarker({
        pnu: danjiData?.pnu,
        realestateType: danjiData?.type,
        schoolTypes: '1',
      });

      if (elementrySchoolRes?.list) {
        setState((prev) => {
          const ele = elementrySchoolRes.list.map((item) => ({
            id: item.school_id,
            name: item.school_name.replace('등학교', ''),
            lat: item.lat,
            lng: item.long,
            type: 'elementary',
          }));
          return {
            ...prev,
            schoolMarkers: [...prev.schoolMarkers, ...ele],
          };
        });
      }

      const middleSchoolRes = await getDanjiSchoolsMarker({
        pnu: danjiData?.pnu,
        realestateType: danjiData?.type,
        schoolTypes: '2',
      });

      if (middleSchoolRes?.list) {
        setState((prev) => {
          const middle = middleSchoolRes.list.map((item) => ({
            id: item.school_id,
            name: item.school_name,
            lat: item.lat,
            lng: item.long,
            type: 'middle',
          }));
          return {
            ...prev,
            schoolMarkers: [...prev.schoolMarkers, ...middle],
          };
        });
      }

      const highSchoolRes = await getDanjiSchoolsMarker({
        pnu: danjiData?.pnu,
        realestateType: danjiData?.type,
        schoolTypes: '3',
      });

      if (highSchoolRes?.list) {
        setState((prev) => {
          const high = highSchoolRes.list.map((item) => ({
            id: item.school_id,
            name: item.school_name.replace('등학교', ''),
            lat: item.lat,
            lng: item.long,
            type: 'high',
          }));
          return {
            ...prev,
            schoolMarkers: [...prev.schoolMarkers, ...high],
          };
        });
      }
    }
  };

  const makeSchoolOff = () => {
    setState((prev) => ({
      ...prev,
      school: false,
      schoolMarkers: [],
      selectedSchool: {},
      selectedSchoolMarker: undefined,
      danjiData: undefined,
    }));
  };

  const makeAroundOn = () => {
    setState((prev) => ({ ...prev, around: true }));
    setState((prev) => ({ ...prev, danjiData }));

    if (danjiData) {
      map.naverMap?.morph({ lat: danjiData.lat, lng: danjiData.long }, 16);
    }
  };

  const makeAroundOff = () => {
    setState((prev) => ({ ...prev, around: false }));
  };

  const makeDataReset = () => {
    setState({
      school: false,
      around: false,
      danjiData: undefined,
      schoolMarkers: [],
      selectedSchool: {},
      selectedSchoolMarker: undefined,
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

  return {
    isSchoolOn: state.school,
    isAroundOn: state.around,
    schoolMarkers: state.schoolMarkers,
    danji: state.danjiData,
    makeSchoolOn,
    makeSchoolOff,
    makeAroundOn,
    makeAroundOff,
    makeDataReset,
    makeSelectedSchool,
    makeSelectedSchoolDefault,
    makeSelectedSchoolMarker,
    makeSelectedSchoolMarkerDefault,
  };
}
