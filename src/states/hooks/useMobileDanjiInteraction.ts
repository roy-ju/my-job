import { useRecoilState } from 'recoil';

import { DanjiDetailResponse } from '@/services/danji/types';

import mobileDanjiInteractionAtom, { BtnState } from '../atom/mobileDanjiMapInteraction';

export default function useMobileDanjiInteraction() {
  const [state, setState] = useRecoilState(mobileDanjiInteractionAtom);

  const makeTrue = () => {
    setState((prev) => ({ ...prev, isTrue: true }));
  };

  const makeFalse = () => {
    setState((prev) => ({ ...prev, isTrue: false }));
  };

  const makeTrueSchool = () => {
    setState((prev) => ({ ...prev, isTrueSchool: true }));
  };
  const makeFalseSchool = () => {
    setState((prev) => ({ ...prev, isTrueSchool: false }));
  };

  const makeTrueAround = () => {
    setState((prev) => ({ ...prev, isTrueAround: true }));
  };
  const makeFalseAround = () => {
    setState((prev) => ({ ...prev, isTrueAround: false }));
  };

  const makeShowMapButton = () => {
    setState((prev) => ({ ...prev, isShowRoad: true }));
  };

  const makeHideMapButton = () => {
    setState((prev) => ({ ...prev, isShowRoad: false }));
  };
  const makeShowRoadButton = () => {
    setState((prev) => ({ ...prev, isShowMap: true }));
  };

  const makeHideRoadButton = () => {
    setState((prev) => ({ ...prev, isShowMap: false }));
  };

  const makeBindDanji = (danji: DanjiDetailResponse | undefined) => {
    setState((prev) => ({ ...prev, danjiAroundData: danji }));
  };

  const makeDanjiSchoolID = (schoolID: string | undefined) => {
    setState((prev) => ({ ...prev, danjiSchoolID: schoolID }));
  };

  const makeDanjiAroundDetailDefault = (val: keyof BtnState) => {
    setState((prev) => ({ ...prev, danjiAroundDetailDefault: val }));
  };

  const makeDanjiAroundAddress = (val: string | undefined) => {
    setState((prev) => ({ ...prev, danjiAddress: val }));
  };

  const makeDanjiAroundPlace = (val: string | undefined) => {
    setState((prev) => ({ ...prev, danjiPlace: val }));
  };

  const makeDanjiAroundLatLng = (lng: string | undefined, lat: string | undefined) => {
    setState((prev) => ({ ...prev, danjiAroundLng: lng, danjiAroundLat: lat }));
  };

  return {
    isTrue: state.isTrue,
    isTrueSchool: state.isTrueSchool,
    isTrueAround: state.isTrueAround,
    isShowRoad: state.isShowRoad,
    isShowMap: state.isShowMap,
    danjiAroundData: state.danjiAroundData,
    danjiAroundDetailDefault: state.danjiAroundDetailDefault,
    danjiSchoolID: state.danjiSchoolID,
    danjiAddress: state.danjiAddress,
    danjiPlace: state.danjiPlace,
    danjiAroundLat: state.danjiAroundLat,
    danjiAroundLng: state.danjiAroundLng,
    makeTrue,
    makeFalse,
    makeTrueSchool,
    makeFalseSchool,
    makeTrueAround,
    makeFalseAround,
    makeShowMapButton,
    makeHideMapButton,
    makeShowRoadButton,
    makeHideRoadButton,
    makeBindDanji,
    makeDanjiAroundDetailDefault,
    makeDanjiSchoolID,
    makeDanjiAroundAddress,
    makeDanjiAroundLatLng,
    makeDanjiAroundPlace,
  };
}
