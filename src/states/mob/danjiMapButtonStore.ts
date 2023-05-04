import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { atom, useRecoilState } from 'recoil';
import { v1 } from 'uuid';

type BtnState = {
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

  danjiAroundData: GetDanjiDetailResponse | undefined;
  danjiAroundDetailDefault: keyof BtnState;
};

export const danjiMapButtonStore = atom<DanjiMapButtonStore>({
  key: `danji_map_button/${v1()}`,
  default: {
    isTrue: false,
    isTrueSchool: false,
    isTrueAround: false,
    isShowRoad: true,
    isShowMap: true,
    danjiAroundData: undefined,
    danjiAroundDetailDefault: 'SW8',
  },
  dangerouslyAllowMutability: true,
});

export function useDanjiMapButtonStore() {
  const [state, setState] = useRecoilState(danjiMapButtonStore);

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

  const makeBindDanji = (danji: GetDanjiDetailResponse | undefined) => {
    setState((prev) => ({ ...prev, danjiAroundData: danji }));
  };

  const makeDanjiAroundDetailDefault = (val: keyof BtnState) => {
    setState((prev) => ({ ...prev, danjiAroundDetailDefault: val }));
  };

  return {
    isTrue: state.isTrue,
    isTrueSchool: state.isTrueSchool,
    isTrueAround: state.isTrueAround,
    isShowRoad: state.isShowRoad,
    isShowMap: state.isShowMap,
    danjiAroundData: state.danjiAroundData,
    danjiAroundDetailDefault: state.danjiAroundDetailDefault,
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
  };
}
