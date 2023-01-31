import { NaverMap } from '@/lib/navermap';
import { NaverLatLng } from '@/lib/navermap/types';
import { mapState } from '@/states/map';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from '../utils';

function getMapState<T>(cb: (ms: string[]) => T, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);

    if (typeof searchParams.get('ms') === 'string') {
      const ms = (searchParams.get('ms') as string).split(',');
      return ms.length > 2 ? cb(ms) : defaultValue;
    }
  }

  return defaultValue;
}
/**
 * 지도레이아웃 초기화와 이벤트 기능구현을 담당하는 훅
 */
export default function useMapLayout() {
  const router = useRouter();
  const [map, setMap] = useState<NaverMap>();
  const setM = useSetRecoilState(mapState);

  /**
   * 지도의 초기값들을 설정한다.
   */
  const minZoom = 8;
  const maxZoom = 19;

  const initialZoom = useMemo(() => getMapState((ms) => Number(ms[2]), 10), []);

  const initialCenter = useMemo(
    () =>
      getMapState(
        (ms) => ({
          lat: Number(ms[0]),
          lng: Number(ms[1]),
        }),
        { lat: 37.3945005, lng: 127.1109415 },
      ),
    [],
  );

  /**
   * 맵 생성시 호출된다.
   */
  const onCreate = useCallback(
    (m: NaverMap) => {
      setMap(m);
      setM({
        m,
      });
    },
    [setM],
  );

  /**
   * 사용자가 지도에서 마우스 왼쪽 버튼을 클릭하면 이벤트가 발생한다.
   * 단, 오버레이를 클릭했을 때는 이벤트가 발생하지 않는다.
   */
  const onClick = useCallback(() => {
    router.replace('', 0);
  }, [router]);

  /**
   * 지도의 움직임이 종료되면(유휴 상태) 이벤트가 발생한다.
   */
  const onIdle = useCallback(
    (_map: NaverMap) => {
      const zoom = _map.getZoom();
      const center = _map.getCenter() as NaverLatLng;
      const ms = [center.lat(), center.lng(), zoom].join(',');
      router.shallowReplace({
        ...router.query,
        ms,
      });
    },
    [router],
  );

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
    onIdle,
  };
}
