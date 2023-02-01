import { NaverMap } from '@/lib/navermap';
import { NaverLatLng } from '@/lib/navermap/types';
import { mapState } from '@/states/map';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from '../utils';

const USER_LAST_LOCATION = 'user_last_location';

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

function getUserLastLocation(): { lat: number; lng: number } {
  if (typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem(USER_LAST_LOCATION);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.lat && parsed.lng) {
        return { lat: parsed.lat, lng: parsed.lng };
      }
    }
  }
  return { lat: 37.3945005, lng: 127.1109415 };
}

/**
 * 지도레이아웃 초기화와 이벤트 기능구현을 담당하는 훅
 */
export default function useMapLayout() {
  const router = useRouter(0);
  const [map, setMap] = useState<NaverMap>();
  const setM = useSetRecoilState(mapState);

  /**
   * 지도의 초기값들을 설정한다.
   */
  const minZoom = 8;
  const maxZoom = 19;

  const initialZoom = useMemo(() => getMapState((ms) => Number(ms[2]), 16), []);

  const initialCenter = useMemo(
    () =>
      getMapState(
        (ms) => ({
          lat: Number(ms[0]),
          lng: Number(ms[1]),
        }),
        getUserLastLocation(),
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
      // ms 가 쿼리에 없으면 지도를 유저의 현재위치로 이동시킨다.
      const mapStateExists = getMapState(() => true, false);
      if (
        !mapStateExists &&
        typeof navigator !== 'undefined' &&
        typeof localStorage !== 'undefined'
      ) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          // 이 좌표를 로컬스토리지에 저장해서, 나중에 지도 로드할때 초기 위치로 설정한다.
          const latlng = { lat: coords.latitude, lng: coords.longitude };
          localStorage.setItem(USER_LAST_LOCATION, JSON.stringify(latlng));
          m.morph(latlng, 16);
        });
      }
    },
    [setM],
  );

  /**
   * 사용자가 지도에서 마우스 왼쪽 버튼을 클릭하면 이벤트가 발생한다.
   * 단, 오버레이를 클릭했을 때는 이벤트가 발생하지 않는다.
   */
  const onClick = useCallback(() => {
    router.popAll();
  }, [router]);

  /**
   * 지도의 움직임이 종료되면(유휴 상태) 이벤트가 발생한다.
   */
  const onIdle = useCallback(
    (_map: NaverMap) => {
      const zoom = _map.getZoom();
      const center = _map.getCenter() as NaverLatLng;
      // query 파라미터에 현재 지도위치 정보를 넣어서,
      // 새로고침이 될때도 이전 위치로 로드할 수 있도록 한다.
      const ms = [center.lat(), center.lng(), zoom].join(',');
      router.setQueryParams({
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
