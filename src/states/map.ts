import { NaverMap } from '@/lib/navermap';
import { atom, useRecoilValue } from 'recoil';
import { v1 } from 'uuid';

interface IMapState {
  naverMap?: NaverMap | null;
  setSchoolType?: (schoolType: number, schoolIds: string[]) => void;
}

export const mapState = atom<IMapState>({
  key: `negocio_map/${v1()}`,
  default: {},
  dangerouslyAllowMutability: true,
});

export default function useMap() {
  const map = useRecoilValue(mapState);
  return map;
}
