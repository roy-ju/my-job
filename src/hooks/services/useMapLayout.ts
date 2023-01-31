import { NaverMap } from '@/lib/navermap';
import { mapState } from '@/states/map';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from '../utils';

/**
 * 지도레이아웃 초기화와 이벤트 기능구현을 담당하는 훅
 */
export default function useMapLayout() {
  const router = useRouter();
  const [map, setMap] = useState<NaverMap>();
  const setM = useSetRecoilState(mapState);

  const minZoom = 8;
  const maxZoom = 19;
  const initialZoom = 10;
  const initialCenter = useMemo(
    () => ({
      lat: 37.3945005,
      lng: 127.1109415,
    }),
    [],
  );

  const onCreate = useCallback(
    (m: NaverMap) => {
      setMap(m);
      setM({
        m,
      });
    },
    [setM],
  );

  const onClick = useCallback(() => {
    router.replace('', 0);
  }, [router]);

  useEffect(() => {
    // 지도 panel 추가되고 생성됨에 따라, 지도 사이즈가 달라지는 케이스 핸들
    map?.autoResize();
  }, [router, map]);

  return {
    minZoom,
    maxZoom,
    initialZoom,
    initialCenter,
    onCreate,
    onClick,
  };
}
