import { NaverMap } from '@/lib/navermap';
import { atom, useRecoilValue } from 'recoil';
import { v1 } from 'uuid';

type MapState = {
  m: NaverMap | null;
};

export const mapState = atom<MapState>({
  key: `negocio_map/${v1()}`,
  default: {
    m: null,
  },
  dangerouslyAllowMutability: true,
});

export default function useMap() {
  const { m } = useRecoilValue(mapState);

  return m;
}
