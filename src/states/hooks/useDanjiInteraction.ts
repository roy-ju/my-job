import { useRecoilState } from 'recoil';

import getDanjiSchoolsMarker from '@/apis/map/danjiMapSchools';

import { DanjiDetailResponse } from '@/services/danji/types';

import { SchoolMarker, AroundMarker } from '@/types/markers';

import danjiInteractionAtom, { AroundMarkers } from '../atom/danjiInteraction';

const schoolTypes = [
  { type: '1', name: 'elementary' },
  { type: '2', name: 'middle' },
  { type: '3', name: 'high' },
];

export default function useDanjiInteraction({ danjiData }: { danjiData?: DanjiDetailResponse }) {
  const [state, setState] = useRecoilState(danjiInteractionAtom);

  const makeSchoolOn = async (callback?: () => unknown) => {
    const newSchoolMarkers: SchoolMarker[] = [];

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

      callback?.();
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

  const makeDanjiAroundPlaceName = (val?: string) => {
    setState((prev) => ({ ...prev, danjiAroundPlaceName: val }));
  };

  return {
    isSchoolOn: state.school,
    isAroundOn: state.around,
    schoolMarkers: state.schoolMarkers,
    danji: state.danjiData,
    activeCategory: state.activeCategory,
    danjiAroundPlaceName: state.danjiAroundPlaceName,
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
    makeDanjiAroundPlaceName,
  };
}
