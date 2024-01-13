import { useRecoilState } from 'recoil';

import mobileDanjiMapAtom from '../atom/danjiMap';

export default function useMobileDanjiMap() {
  const [state, setState] = useRecoilState(mobileDanjiMapAtom);

  const makeRoadLayer = () => {
    setState((prev) => ({ ...prev, mapType: 'roadlayer' }));
  };

  const makeGeneralMap = () => {
    setState((prev) => ({ ...prev, mapType: 'map' }));
  };

  const makeRoadType = () => {
    setState((prev) => ({ ...prev, mapType: 'road' }));
  };

  const makePanoPosition = (latitude: number, longitude: number) => {
    setState((prev) => ({ ...prev, panoCenter: { lat: latitude, lng: longitude } }));
  };

  const makePanoInitialize = () => {
    setState((prev) => ({ ...prev, panoCenter: undefined }));
  };

  return {
    mapType: state.mapType,
    panoCenter: state.panoCenter,
    makeRoadLayer,
    makeGeneralMap,
    makeRoadType,
    makePanoPosition,
    makePanoInitialize,
  };
}
