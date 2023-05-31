/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/naming-convention */

import { atom, useRecoilState } from 'recoil';
import { v1 } from 'uuid';

type DanjiMapTypeStore = {
  mapType: string;
  panoCenter?: { lat: number; lng: number };
};

export const danjiMapTypeStore = atom<DanjiMapTypeStore>({
  key: `danji_map_type/${v1()}`,
  default: { mapType: 'map', panoCenter: undefined },
  dangerouslyAllowMutability: true,
});

export function useDanjiMapTypeStore() {
  const [state, setState] = useRecoilState(danjiMapTypeStore);

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
