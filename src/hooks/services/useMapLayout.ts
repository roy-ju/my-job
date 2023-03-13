import mapSearch, { MapSearchResponse, MapSearchLevelOneResponse } from '@/apis/map/map_search_level';
import { getDefaultFilterAptOftl } from '@/components/organisms/MapFilter';
import { Filter } from '@/components/organisms/MapFilter/types';
import { coordToRegion } from '@/lib/kakao';
import { NaverMap } from '@/lib/navermap';
import { NaverLatLng } from '@/lib/navermap/types';
import { getMetersByZoom } from '@/lib/navermap/utils';
import { mapState } from '@/states/map';
import _ from 'lodash';
import { ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from '../utils';
import useStateSyncedWithURL from '../utils/useStateSyncedWithURL';
import { KakaoAddressAutocompleteResponseItem } from './useKakaoAddressAutocomplete';

interface CommonMapMarkers {
  bubjungdongCode?: string;
  bubjungdongName?: string;
  danjiCount?: number;
  pnu?: string;
  danjiRealestateType?: number;
  pyoung?: string;
  price?: number;
  monthlyRentFee?: number;
  roadNameAddress?: string;
  jibunAddress?: string;
  listingIDs?: string;
  tradePrice?: number;
  deposit?: number;
  listingCount: number;
  lat: number;
  lng: number;
}

export interface MapBounds {
  mapLevel: number;
  sw: { lat: number; lng: number };
  ne: { lat: number; lng: number };
  nw: { lat: number; lng: number };
  se: { lat: number; lng: number };
}

const USER_LAST_LOCATION = 'user_last_location';
const DEFAULT_LAT = 37.3945005; // 판교역
const DEFAULT_LNG = 127.1109415;
const DEFAULT_ZOOM = 16; // 100m
const DEFAULT_MIN_ZOOM = 8; // 30km
const DEFAULT_MAX_ZOOM = 19; // 20m

/**
 * 현재 지도 위치정보를 쿼리파라미터에 저장한다.
 */
function setMapState(map: NaverMap) {
  const zoom = map.getZoom();
  const center = map.getCenter() as NaverLatLng;

  const ms = [center.lat(), center.lng(), zoom].join(',');
  if (typeof window !== 'undefined') {
    // 보통의 경우라면 router 를 사용해서 쿼리파라미터를 업데이트 하겠지만,
    // 지도 쿼리파라미터 업데이트 같은 경우에는 컴포넌트의 리렌더링이 불필요 함으로,
    // History API 를 사용해서 직접 업데이트 한다.
    const url = new URL(window.location.toString());
    url.searchParams.set('ms', ms);
    window.history.replaceState(window.history.state, '', url);
  }
}

/**
 * ms 쿼리파라미터를 가지고 온다. 가지고 올 수 없으면 지정한 default 값을 반환한다.
 */
function getMapState<T>(cb: (ms: string[]) => T, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    // setMapState 에서 History API 를 사용해서 쿼리파라미터를 업데이트 했으므로,
    // router.query 로 가지고올수 없다. location.search 로 직접가져와서 파싱한다.
    const searchParams = new URLSearchParams(window.location.search);
    if (typeof searchParams.get('ms') === 'string') {
      const ms = (searchParams.get('ms') as string).split(',');
      return ms.length > 2 ? cb(ms) : defaultValue;
    }
  }

  return defaultValue;
}

/**
 * 로컬스토리지에 저장된 유저의 마지막 위도 경도를 반환하고
 * 없으면 default 값 (판교역) 을 반환한다.
 */
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
  return { lat: DEFAULT_LAT, lng: DEFAULT_LNG };
}

/**
 * 지도레이아웃 초기화와 이벤트 기능구현을 담당하는 훅
 */
export default function useMapLayout() {
  const router = useRouter(0); // 지도는 최상단이니까 제일 상단 depth 로 초기화한다.
  const [map, setMap] = useRecoilState(mapState); // 지도 레이아웃을 가진 어느 페이지에서간에 map 을 사용할수있도록한다. useMap 훅을 사용
  const [mapType, setMapType] = useState('normal');
  const [mapLayer, setMapLayer] = useState('none');
  const [schoolType, setSchoolType] = useState('none');
  const mapLayerRef = useRef<naver.maps.LabelLayer | null>(null); // 지적도, 거리뷰 레이어
  const [centerAddress, setCenterAddress] = useState(['서울특별시', '중구', '남대문로2가']); // 맵 중앙 주소
  const [bounds, setBounds] = useState<MapBounds | null>(null);
  const [filter, setFilter] = useStateSyncedWithURL<Filter>('filter', getDefaultFilterAptOftl());
  const [listingCount, setListingCount] = useState(0);
  const [markers, setMarkers] = useState<CommonMapMarkers[]>([]);

  /**
   * 지도 중심좌표를 reverse geocoding 한다.
   */
  const handleCenterAddressChange = useCallback(async (_map: NaverMap) => {
    const center = _map.getCenter() as NaverLatLng;
    const response = await coordToRegion(center.x, center.y);
    if (response && response.documents?.length > 0) {
      const region = response.documents.filter((item) => item.region_type === 'B')[0];
      if (region) {
        setCenterAddress([region.region_1depth_name, region.region_2depth_name, region.region_3depth_name]);
      }
    }
  }, []);

  /**
   * 지도의 초기값들을 설정한다.
   */
  const initialZoom = useMemo(() => getMapState((ms) => Number(ms[2]), DEFAULT_ZOOM), []);

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

  const updateMarkers = useCallback(async (mapBounds: MapBounds) => {
    const res = await mapSearch({ level: mapBounds.mapLevel, bounds: mapBounds });
    setListingCount(res?.listing_count ?? 0);
    if (res && mapBounds.mapLevel !== 1) {
      const regions = (res as MapSearchResponse).results;
      setMarkers(
        regions?.map((item) => ({
          bubjungdongCode: item.bubjungdong_code,
          bubjungdongName: item.bubjungdong_name,
          danjiCount: item.danji_count,
          listingCount: item.listing_count,
          lat: item.lat,
          lng: item.long,
        })),
      );
    } else if (res && mapBounds.mapLevel === 1) {
      const danjis = (res as MapSearchLevelOneResponse).danji_list;
      const danjiMap: {
        [key: string]: CommonMapMarkers;
      } = {};

      danjis?.map((item) => {
        danjiMap[`${item.pnu}${item.danji_realestate_type}`] = {
          pnu: item.pnu,
          danjiRealestateType: item.danji_realestate_type,
          pyoung: item.pyoung,
          price: item.price,
          jibunAddress: item.jibun_address,
          roadNameAddress: item.road_name_address,
          listingCount: item.listing_count,
          lat: item.lat,
          lng: item.long,
        };
      });

      setMarkers(Object.values(danjiMap));
    }
  }, []);

  /**
   * 지도 코너 좌표값을 업데이트 한다.
   */
  const updateBounds = useCallback((m: NaverMap) => {
    let mapLevel = -1;

    const meters = getMetersByZoom(m.getZoom());

    if (meters <= 50) {
      mapLevel = 1;
    } else if (meters < 1000) {
      mapLevel = 2;
    } else if (meters <= 5000) {
      mapLevel = 3;
    } else {
      mapLevel = 4;
    }

    const naverMapBounds = m.getBounds() as naver.maps.LatLngBounds;
    const sw = naverMapBounds.getSW();
    const ne = naverMapBounds.getNE();
    setBounds({
      mapLevel,
      sw: {
        lat: sw.lat(),
        lng: sw.lng(),
      },
      ne: {
        lat: ne.lat(),
        lng: ne.lng(),
      },
      nw: {
        lat: ne.lat(),
        lng: sw.lng(),
      },
      se: {
        lat: sw.lat(),
        lng: ne.lng(),
      },
    });
  }, []);

  /**
   * 맵 생성시 호출된다. map.isReady === false
   */
  const onCreate = useCallback(
    (m: NaverMap) => {
      if (typeof window !== 'undefined') {
        window.NaverMap = m;
      }

      setMap(m);
      handleCenterAddressChange(m);
      updateBounds(m);
    },
    [setMap, handleCenterAddressChange, updateBounds],
  );

  /**
   * 맵이 초기화 될때 호출된다. map.isReady === true
   */
  const onInit = useCallback((m: NaverMap) => {
    // ms 가 쿼리에 없으면 지도를 유저의 현재위치로 이동시킨다.
    const mapStateExists = getMapState(() => true, false);
    if (!mapStateExists && typeof navigator !== 'undefined' && typeof localStorage !== 'undefined') {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        // 이 좌표를 로컬스토리지에 저장해서, 나중에 지도 로드할때 초기 위치로 설정한다.
        const latlng = { lat: coords.latitude, lng: coords.longitude };
        localStorage.setItem(USER_LAST_LOCATION, JSON.stringify(latlng));
        m.morph(latlng, DEFAULT_ZOOM);
      });
    }
  }, []);

  /**
   * 사용자가 지도에서 마우스 왼쪽 버튼을 클릭하면 이벤트가 발생한다.
   * 단, 오버레이(지도마커)를 클릭했을 때는 이벤트가 발생하지 않는다.
   */
  const onClick = useCallback(() => {
    router.popAll();
  }, [router]);

  /**
   * 지도의 움직임이 종료되면(유휴 상태) 이벤트가 발생한다.
   */
  const onIdle = useMemo(
    () =>
      _.debounce(
        (_map: NaverMap) => {
          // query 파라미터에 현재 지도위치 정보를 넣어서,
          // 새로고침이 될때도 이전 위치로 로드할 수 있도록 한다.
          setMapState(_map);
          // 지도 중심좌표를 가지고 와서 reverse geocoding 해서 주소를 가지고 온다.
          handleCenterAddressChange(_map);

          // 지도 코너 좌표값을 업데이트 한다.
          updateBounds(_map);
        },
        300,
        { leading: true, trailing: true },
      ),
    [handleCenterAddressChange, updateBounds],
  );

  const onZooming = useCallback((_map: NaverMap) => {
    setMarkers([]);
  }, []);

  /**
   * depth 가 열리고 닫힘에 따라, 지도 사이즈가 재조정이 필요할때 호출된다.
   * route 의 변화에 따라서 지도를 resize 해도 되지만, 그렇게 되면
   * 뻑뻑하게 reisze 돼서, resizeObserver 로 매 프레임마다 resize 를 해준다.
   */
  useEffect(() => {
    const mapElement = document.getElementById('map-container');
    const resizeObserver = new ResizeObserver(() => {
      if (typeof window !== 'undefined') {
        window.NaverMap?.autoResize();
      }
    });

    if (mapElement) {
      resizeObserver.observe(mapElement);
      return () => {
        resizeObserver.unobserve(mapElement);
      };
    }
    return () => {};
  }, []);

  /**
   * 맵 레이어 핸들링
   */
  useEffect(() => {
    if (typeof window === 'undefined' || typeof naver === 'undefined') {
      return;
    }
    if (!map) {
      return;
    }

    if (mapLayer === 'none') {
      mapLayerRef.current?.setMap(null);
      mapLayerRef.current = null;
    } else if (mapLayer === 'cadastral') {
      mapLayerRef.current?.setMap(null);
      mapLayerRef.current = new naver.maps.CadastralLayer();
      mapLayerRef.current.setMap(map);
    } else if (mapLayer === 'street') {
      mapLayerRef.current?.setMap(null);
      mapLayerRef.current = new naver.maps.StreetLayer();
      mapLayerRef.current.setMap(map);
    }
  }, [map, mapLayer]);

  useEffect(() => {
    if (bounds) {
      updateMarkers(bounds);
    }
  }, [bounds, updateMarkers]);

  // Map Control Handlers

  const morphToCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      // 이 좌표를 로컬스토리지에 저장해서, 나중에 지도 로드할때 초기 위치로 설정한다.
      const latlng = { lat: coords.latitude, lng: coords.longitude };
      localStorage.setItem(USER_LAST_LOCATION, JSON.stringify(latlng));
      map?.morph(latlng, DEFAULT_ZOOM);
    });
  }, [map]);

  const zoomIn = useCallback(() => {
    if (!map) return;
    map.zoomBy(1, undefined, true);
  }, [map]);

  const zoomOut = useCallback(() => {
    if (!map) return;
    map.zoomBy(-1, undefined, true);
  }, [map]);

  const handleChangeMapType = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (!map) return;
      const newMapType = event.target.value;

      switch (newMapType) {
        case 'normal':
          map.setMapTypeId(naver.maps.MapTypeId.NORMAL);
          break;
        case 'satellite':
          map.setMapTypeId(naver.maps.MapTypeId.SATELLITE);
          break;
        case 'terrain':
          map.setMapTypeId(naver.maps.MapTypeId.TERRAIN);
          break;
        default:
          map.setMapTypeId(naver.maps.MapTypeId.NORMAL);
          break;
      }

      setMapType(event.target.value);
    },
    [map],
  );

  const handleChangeMapLayer = useCallback((ml: string) => {
    setMapLayer((prev) => {
      if (prev === ml) {
        return 'none';
      }
      return ml;
    });
  }, []);

  const handleChangeSchoolType = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    setSchoolType(event.target.value);
  }, []);

  const handleMapSearch = useCallback(
    (item: KakaoAddressAutocompleteResponseItem) => {
      if (!map) return;
      map.morph(
        {
          lat: item.lat,
          lng: item.lng,
        },
        18,
      );
    },
    [map],
  );

  const handleChangeFilter = useCallback(
    (value: Partial<Filter>) => {
      setFilter((prev) => ({ ...prev, ...value }));
    },
    [setFilter],
  );

  return {
    // common map handlers and properties
    minZoom: DEFAULT_MIN_ZOOM,
    maxZoom: DEFAULT_MAX_ZOOM,
    zoom: initialZoom,
    center: initialCenter,
    centerAddress,
    onInit,
    onCreate,
    onClick,
    onIdle,
    onZooming,
    // ones with business logics
    filter,
    listingCount,
    markers,
    bounds,
    mapType,
    mapLayer,
    schoolType,
    morphToCurrentLocation,
    zoomIn,
    zoomOut,
    handleChangeMapType,
    handleChangeMapLayer,
    handleChangeSchoolType,
    handleMapSearch,
    handleChangeFilter,
  };
}
