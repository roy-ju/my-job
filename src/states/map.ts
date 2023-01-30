import { NaverMap } from '@/lib/navermap';
import { atom, useRecoilValue } from 'recoil';
import { v1 } from 'uuid';

type MapState = {
  m?: NaverMap;
};

export const mapState = atom<MapState>({
  key: `negocio_map/${v1()}`,
  dangerouslyAllowMutability: true,
});

export default function useMap() {
  return useRecoilValue(mapState).m;
}
