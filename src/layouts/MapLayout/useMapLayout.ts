/* eslint-disable react-hooks/exhaustive-deps */
import getSchools from '@/apis/map/mapSchools';
import mapSearch, { MapSearchResponse, MapSearchLevelOneResponse } from '@/apis/map/mapSearchLevel';
import { getDefaultFilterAptOftl } from '@/components/organisms/MapFilter';
import { Filter } from '@/components/organisms/MapFilter/types';
import { coordToRegion } from '@/lib/kakao';
import { NaverMap } from '@/lib/navermap';
import { NaverLatLng } from '@/lib/navermap/types';
import { getMetersByZoom } from '@/lib/navermap/utils';
import { mapState as recoilMapState } from '@/states/map';
import _ from 'lodash';
import { ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useIsomorphicLayoutEffect, useRouter, useSessionStorage } from '@/hooks/utils';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import Routes from '@/router/routes';
import useRecentSearches from '@/hooks/services/useRecentSearches';
import { v1 } from 'uuid';
import { toast } from 'react-toastify';
import { RealestateType } from '@/constants/enums';
import getHakgudo from '@/apis/map/mapHakgudos';
import { useDanjiSummary } from '@/apis/map/mapDanjiSummary';

const USER_LAST_LOCATION = 'user_last_location';
const DEFAULT_LAT = 37.3945005; // 판교역
const DEFAULT_LNG = 127.1109415;
const DEFAULT_ZOOM = 14; // 500m
const DEFAULT_MIN_ZOOM = 8; // 30km
const DEFAULT_MAX_ZOOM = 19; // 20m

export interface DanjiSummary {
  id: string;
  name: string;
  householdCount: number;
  buyListingCount: number;
  rentListingCount: number;
}

export interface CommonMarker {
  id: string;
  lat: number;
  lng: number;
  onClick?: () => void;
}

export interface ListingDanjiMarker extends CommonMarker {
  variant: 'blue' | 'nego';
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
}

export interface SchoolMarker extends CommonMarker {
  type: string;
  name: string;
}

export interface MapBounds {
  mapLevel: number;
  sw: { lat: number; lng: number };
  ne: { lat: number; lng: number };
  nw: { lat: number; lng: number };
  se: { lat: number; lng: number };
}

export function getBounds(m: NaverMap): MapBounds {
  let mapLevel = -1;

  const meters = getMetersByZoom(m.getZoom());

  if (meters <= 100) {
    mapLevel = 1;
  } else if (meters <= 500) {
    mapLevel = 2;
  } else if (meters <= 5000) {
    mapLevel = 3;
  } else {
    mapLevel = 4;
  }

  const naverMapBounds = m.getBounds() as naver.maps.LatLngBounds;
  const sw = naverMapBounds.getSW();
  const ne = naverMapBounds.getNE();

  return {
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
  };
}

/**
 * 현재 지도 위치정보를 쿼리파라미터에 저장한다.
 */
function setMapPositionState(map: NaverMap) {
  const zoom = map.getZoom();
  const center = map.getCenter() as NaverLatLng;

  const ms = [center.lat(), center.lng(), zoom].join(',');
  window.sessionStorage.setItem('ms', ms);
}

/**
 * ms 쿼리파라미터를 가지고 온다. 가지고 올 수 없으면 지정한 default 값을 반환한다.
 */
function getMapPositionState<T>(cb: (ms: string[]) => T, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const item = window.sessionStorage.getItem('ms');
    if (item !== null) {
      const ms = item.split(',');
      return ms.length > 2 ? cb(ms) : defaultValue;
    }
  }
  return defaultValue;
}

/**
 * 로컬스토리지에 저장된 유저의 마지막 위도 경도를 반환하고
 * 없으면 default 값 (판교역) 을 반환한다.
 */
function getUserLastLocation(): { lat: number; lng: number } | null {
  if (typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem(USER_LAST_LOCATION);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.lat && parsed.lng) {
        return { lat: parsed.lat, lng: parsed.lng };
      }
    }
  }
  return null;
}

/**
 * 지도레이아웃 초기화와 이벤트 기능구현을 담당하는 훅
 */
export default function useMapLayout() {
  const router = useRouter(0); // 지도는 최상단이니까 제일 상단 depth 로 초기화한다.

  const abortControllerRef = useRef<AbortController>();

  const {
    items: recentSearches,
    add: addRecentSearch,
    clear: clearRecentSearches,
    remove: removeRecentSearch,
  } = useRecentSearches<KakaoAddressAutocompleteResponseItem>();

  const [isGeoLoading, setIsGeoLoading] = useState(false);

  const [myMarker, setMyMarker] = useState<{ lat: number; lng: number } | null>(null);

  const [mapState, setMapState] = useRecoilState(recoilMapState); // 지도 레이아웃을 가진 어느 페이지에서간에 map 을 사용할수있도록한다. useMap 훅을 사용

  const [mapType, setMapType] = useState('normal');

  const [mapLayer, setMapLayer] = useState('none');

  const [schoolType, setSchoolType] = useState('none');

  const [priceType, setPriceType] = useState('buy');

  const mapLayerRef = useRef<naver.maps.LabelLayer | null>(null); // 지적도, 거리뷰 레이어

  const [centerAddress, setCenterAddress] = useState(['서울특별시', '중구', '남대문로2가']); // 맵 중앙 주소

  const [bounds, setBounds] = useState<MapBounds | null>(null);

  const [filter, setFilter] = useSessionStorage<Filter>('mapFilter', getDefaultFilterAptOftl());

  const [listingCount, setListingCount] = useState(0);

  const [markers, setMarkers] = useState<ListingDanjiMarker[]>([]);

  const [schoolMarkers, setSchoolMarkers] = useState<SchoolMarker[]>([]);

  const [polygons, setPolygons] = useState<naver.maps.Polygon[]>([]);

  const [selectedMarker, setSelectedMarker] = useState<CommonMarker | null>(null);

  const lastSearchItem = useRef<KakaoAddressAutocompleteResponseItem | null>(null);

  const [popup, setPopup] = useState('');

  const [streetViewEvent, setStreetViewEvent] = useState<{
    address: string;
    latlng: naver.maps.LatLng;
  } | null>(null);

  const [mapToggleValue, setMapToggleValue] = useState(0);

  const isPanningRef = useRef(false);

  const { data: danjiSummary } = useDanjiSummary(selectedMarker as ListingDanjiMarker);

  const handleChangeMapToggleValue = useCallback((newValue: number) => {
    setMapToggleValue(newValue);
  }, []);

  const handleChangePriceType = useCallback((newValue: string) => {
    setPriceType(newValue);
  }, []);

  const handleCloseStreetView = useCallback(() => {
    setStreetViewEvent(null);
  }, []);

  const handleChangeMapType = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (!mapState?.naverMap) return;
      const newMapType = event.target.value;

      switch (newMapType) {
        case 'normal':
          mapState?.naverMap.setMapTypeId(naver.maps.MapTypeId.NORMAL);
          break;
        case 'satellite':
          mapState?.naverMap.setMapTypeId(naver.maps.MapTypeId.SATELLITE);
          break;
        case 'terrain':
          mapState?.naverMap.setMapTypeId(naver.maps.MapTypeId.TERRAIN);
          break;
        default:
          mapState?.naverMap.setMapTypeId(naver.maps.MapTypeId.NORMAL);
          break;
      }

      setMapType(event.target.value);
    },
    [mapState?.naverMap],
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
    (item: KakaoAddressAutocompleteResponseItem, isFromRecentSearch: boolean) => {
      if (!mapState?.naverMap) return;

      if (!isFromRecentSearch) {
        addRecentSearch({
          ...item,
          id: v1(),
        });
      }

      mapState?.naverMap.morph(
        {
          lat: item.lat,
          lng: item.lng,
        },
        18,
      );
      // 마커 API 응답후, 주소로 마커를 선택하기위해서 저장해둔다.
      lastSearchItem.current = item;
    },
    [mapState?.naverMap, lastSearchItem],
  );

  const handleChangeFilter = useCallback(
    (value: Partial<Filter>) => {
      setFilter((prev) => {
        const old = prev === null ? getDefaultFilterAptOftl() : prev;
        if (_.isEqual(old, { ...old, ...value })) {
          return old;
        }
        return {
          ...old,
          ...value,
        };
      });
    },
    [setFilter],
  );

  /**
   * 지도를 줌인 시킨다. 오른쪽 지도 컨트롤버튼중 + 버튼 클릭에서 사용
   */
  const zoomIn = useCallback(() => {
    if (!mapState?.naverMap) return;
    mapState?.naverMap.zoomBy(1, undefined, true);
  }, [mapState?.naverMap]);

  /**
   * 지도를 줌아웃 시킨다. 오른쪽 지도 컨트롤버튼중 - 버튼 클릭에서 사용
   */
  const zoomOut = useCallback(() => {
    if (!mapState?.naverMap) return;
    mapState?.naverMap.zoomBy(-1, undefined, true);
  }, [mapState?.naverMap]);

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
  const initialZoom = useMemo(() => getMapPositionState((ms) => Number(ms[2]), DEFAULT_ZOOM), []);

  const initialCenter = useMemo(
    () =>
      getMapPositionState(
        (ms) => ({
          lat: Number(ms[0]),
          lng: Number(ms[1]),
        }),
        getUserLastLocation() ?? { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
      ),
    [],
  );

  /**
   * 학구도 폴리곤을 그린다.
   */
  const renderHakgudoPolygon = useCallback(async (m: NaverMap, schoolID: string) => {
    const hakgudoRes = await getHakgudo(schoolID);
    setPolygons(
      hakgudoRes?.list?.map((p: any) => {
        const paths = JSON.parse(p.polygons as string)?.coordinates[0][0];
        const poly = new naver.maps.Polygon({
          map: m,
          paths: paths.map((v: [number, number]) => new naver.maps.LatLng(v[1], v[0])),
          fillColor: '#FF6D41',
          fillOpacity: 0.15,
          strokeColor: '#F34829',
          strokeOpacity: 1,
          strokeWeight: 2,
        });
        return poly;
      }) ?? [],
    );
  }, []);

  /**
   * 지도위의 마커를 그린다.
   */
  const updateMarkers = useCallback(
    async (_map: NaverMap, mapBounds: MapBounds, mapFilter: Filter, toggleValue: number, priceTypeValue: string) => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      const res = await mapSearch({
        level: mapBounds.mapLevel,
        bounds: mapBounds,
        filter: mapFilter,
        mapToggleValue: toggleValue,
        priceType: priceTypeValue,
        abortController: abortControllerRef.current,
      });

      setListingCount(res?.listing_count ?? 0);

      const variant = mapFilter.realestateTypeGroup !== 'apt,oftl' || toggleValue === 1 ? 'nego' : 'blue';

      if (res && mapBounds.mapLevel !== 1) {
        let regions = (res as MapSearchResponse).results;
        if (variant === 'nego') {
          regions = regions?.filter((region) => region.listing_count !== 0);
        }
        // 지역 마커
        setMarkers(
          regions?.map((item) => ({
            id: `regionMarker:${item.bubjungdong_code}`,
            variant,
            bubjungdongCode: item.bubjungdong_code,
            bubjungdongName: item.bubjungdong_name,
            danjiCount: item.danji_count,
            listingCount: item.listing_count,
            lat: item.lat,
            lng: item.long,
            onClick(this) {
              if (isPanningRef.current) return;
              setPolygons([]);
              setSelectedMarker(this);
            },
          })) ?? [],
        );
      } else if (res && mapBounds.mapLevel === 1) {
        // 매물 마커
        const listings = (res as MapSearchLevelOneResponse).listing_list ?? [];
        const listingMap: {
          [key: string]: ListingDanjiMarker;
        } = {};

        listings?.forEach((item) => {
          const markerID = `listingMarker:${item.listing_ids}`;

          listingMap[markerID] = {
            id: markerID,
            variant,
            listingCount: item.listing_count,
            lat: item.lat,
            lng: item.long,
            price: priceTypeValue === 'buy' ? item.trade_price : item.deposit,
            // 매물 마커 클릭 이벤트
            onClick(this) {
              if (isPanningRef.current) return;
              router.replace(Routes.MapListingList, {
                searchParams: {
                  listingIDs: item.listing_ids,
                },
              });
              setPolygons([]);
              setSelectedMarker(this);
            },
          };
        });

        // 단지 마커
        let danjis = (res as MapSearchLevelOneResponse).danji_list ?? [];
        if (variant === 'nego') {
          danjis = danjis?.filter((danji) => danji.listing_count !== 0);
        }

        const danjiMap: {
          [key: string]: ListingDanjiMarker;
        } = {};

        danjis?.forEach((item) => {
          const markerID = `danjiMarker:${item.pnu}${item.danji_realestate_type}`;

          // 중복좌표는 살짝 옮긴다.
          if (
            danjiMap[`danjiMarker:${item.pnu}${RealestateType.Apartment}`] ||
            danjiMap[`danjiMarker:${item.pnu}${RealestateType.Officetel}`]
          ) {
            item.long += 0.00035;
          }

          danjiMap[markerID] = {
            id: markerID,
            variant,
            pnu: item.pnu,
            danjiRealestateType: item.danji_realestate_type,
            pyoung: item.pyoung,
            price: item.price,
            jibunAddress: item.jibun_address,
            roadNameAddress: item.road_name_address,
            listingCount: item.listing_count,
            lat: item.lat,
            lng: item.long,
            // 단지마커 클릭이벤트
            onClick(this) {
              if (isPanningRef.current) return;
              // 단지 상세로 보내는 Router
              router.replace(Routes.DanjiDetail, {
                searchParams: { p: item.pnu, rt: item.danji_realestate_type.toString() },
              });
              setPolygons([]);
              setSelectedMarker(this);
            },
          };
        });

        // 맵의 주소검색 결과에 마커가 포함되어있으면, 마커를 선택한다.
        if (lastSearchItem.current) {
          const searchedDanji = Object.values(danjiMap)?.find(
            ({ jibunAddress, roadNameAddress }) =>
              lastSearchItem.current?.roadAddressName === roadNameAddress ||
              lastSearchItem.current?.addressName === jibunAddress,
          );
          if (searchedDanji) {
            setSelectedMarker(searchedDanji);

            router.replace(Routes.DanjiDetail, {
              searchParams: { p: searchedDanji.pnu as string, rt: `${searchedDanji.danjiRealestateType}` },
            });
          }
          lastSearchItem.current = null;
        }

        if (listings.length > 0) {
          setMarkers(Object.values(listingMap));
        } else {
          setMarkers(Object.values(danjiMap));
        }
      }
    },
    [lastSearchItem, router],
  );

  const deferredUpdateMarkers = useMemo(() => _.debounce(updateMarkers, 100), [updateMarkers]);

  /**
   * 학교 마커를 그린다.
   */
  const updateSchoolMarkers = useCallback(
    async (_map: NaverMap, mapBounds: MapBounds, st: string) => {
      const schoolTypes = st === 'elementary' ? '1' : st === 'middle' ? '2' : '3';

      const res = await getSchools({ schoolTypes, bounds: mapBounds });
      setSchoolMarkers(
        res?.list?.map((item) => {
          const markerID = `schoolMarker:${item.school_id}`;
          return {
            id: markerID,
            lat: item.lat,
            lng: item.long,
            name: schoolType === '2' ? item.school_name.replace('학교', '') : item.school_name.replace('등학교', ''),
            type: st,
            onClick(this) {
              if (isPanningRef.current) return;
              setSelectedMarker(this);
            },
          };
        }) ?? [],
      );
    },
    [schoolType],
  );

  /**
   * 지도 코너 좌표값을 업데이트 한다.
   */
  const updateBounds = useCallback((m: NaverMap) => {
    setBounds(getBounds(m));
  }, []);

  /**
   * 맵 생성시 호출된다. map.isReady === false
   */
  const onCreate = useCallback(
    (m: NaverMap) => {
      if (typeof window !== 'undefined') {
        window.NaverMap = m;
      }

      setMapState({
        naverMap: m,
      });
      handleCenterAddressChange(m);
      updateBounds(m);
    },
    [setMapState, handleCenterAddressChange, updateBounds],
  );

  /**
   * 맵이 초기화 될때 호출된다. map.isReady === true
   */
  const onInit = useCallback((m: NaverMap) => {
    // ms 가 쿼리에 없으면 지도를 유저의 현재위치로 이동시킨다.
    const mapStateExists = getMapPositionState(() => true, false);
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
  const onMapClick = useCallback(
    async (_map: NaverMap, e: { latlng: naver.maps.LatLng }) => {
      setPolygons([]);
      setSelectedMarker(null);

      if (mapLayer === 'street') {
        const response = await coordToRegion(e.latlng.lng(), e.latlng.lat());
        if (response && response.documents?.length > 0) {
          const region = response.documents.filter((item) => item.region_type === 'B')[0];
          setStreetViewEvent({
            address: `${region.region_1depth_name} ${region.region_2depth_name} ${region.region_3depth_name}`,
            latlng: e.latlng,
          });
        }
      }
    },
    [router, mapLayer],
  );

  /**
   * 지도의 움직임이 종료되면(유휴 상태) 이벤트가 발생한다.
   */
  const onIdle = useMemo(
    () =>
      _.debounce(
        (_map: NaverMap) => {
          setTimeout(() => {
            isPanningRef.current = false;
          }, 100);
          // query 파라미터에 현재 지도위치 정보를 넣어서,
          // 새로고침이 될때도 이전 위치로 로드할 수 있도록 한다.
          setMapPositionState(_map);
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

  /**
   *  지도가 움직일때 발생한다.
   */
  const onBoundsChanged = useCallback(() => {
    isPanningRef.current = true;
  }, []);

  /**
   * 줌 효과가 시작될때, 이벤트가 발생한다.
   */
  const onZoomStart = useCallback((_map: NaverMap) => {
    setMarkers((prev) => {
      if (prev.length > 0) {
        return [];
      }
      return prev;
    });
    setSchoolMarkers((prev) => {
      if (prev.length > 0) {
        return [];
      }
      return prev;
    });
    setSelectedMarker(null);
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
    if (!mapState?.naverMap) {
      return;
    }

    if (mapLayer === 'none') {
      mapLayerRef.current?.setMap(null);
      mapLayerRef.current = null;
    } else if (mapLayer === 'cadastral') {
      mapLayerRef.current?.setMap(null);
      mapLayerRef.current = new naver.maps.CadastralLayer();
      mapLayerRef.current.setMap(mapState.naverMap);
    } else if (mapLayer === 'street') {
      mapLayerRef.current?.setMap(null);
      mapLayerRef.current = new naver.maps.StreetLayer();
      mapLayerRef.current.setMap(mapState.naverMap);
    }
  }, [mapState?.naverMap, mapLayer]);

  /**
   * 단지/매물/학교 마커들이 선택될때 실행된다.
   */
  useEffect(() => {
    if (!mapState.naverMap || !selectedMarker) return;

    const splittedMarkerID = selectedMarker.id.split(':');
    const markerKey = splittedMarkerID.pop();
    const markerType = splittedMarkerID.pop();
    const _map = mapState.naverMap;

    switch (markerType) {
      case 'regionMarker':
        _map.morph({ lat: selectedMarker.lat, lng: selectedMarker.lng }, _map.getZoom() + 2);
        break;
      case 'danjiMarker':
        _map.morph({ lat: selectedMarker.lat, lng: selectedMarker.lng }, 18);
        break;
      case 'listingMarker':
        _map.morph({ lat: selectedMarker.lat, lng: selectedMarker.lng }, 18);
        break;
      case 'schoolMarker':
        if (markerKey) renderHakgudoPolygon(_map, markerKey);
        _map.morph({ lat: selectedMarker.lat, lng: selectedMarker.lng });
        break;
      default:
        break;
    }
  }, [mapState.naverMap, selectedMarker]);

  /**
   * 맵이 이동할때마다, 마커를 그린다.
   */
  useEffect(() => {
    if (bounds && mapState?.naverMap) {
      deferredUpdateMarkers(mapState?.naverMap, bounds, filter, mapToggleValue, priceType);
    }
  }, [mapState?.naverMap, bounds, deferredUpdateMarkers, filter, mapToggleValue, priceType]);

  /**
   * 학교가 활성화되어있으면, 맵이 이동할때마다 학교 마커를 그린다.
   */
  useEffect(() => {
    if (bounds && schoolType !== 'none' && mapState?.naverMap) {
      if (bounds.mapLevel < 3) {
        updateSchoolMarkers(mapState?.naverMap, bounds, schoolType);
      } else {
        toast.error('지도를 확대하여 학교마커를 확인하세요.', { toastId: 'schoolMarkerError' });
        setSchoolMarkers([]);
        setPolygons([]);
        // setSelectedMarkerID('');
        setSelectedMarker(null);
      }
    } else if (schoolType === 'none') {
      setSchoolMarkers([]);
    }
  }, [mapState?.naverMap, bounds, schoolType, updateSchoolMarkers]);

  /**
   * 폴리곤을 그린다.
   */
  useIsomorphicLayoutEffect(
    () => () => {
      polygons.forEach((v: naver.maps.Polygon) => {
        v.setMap(null);
      });
    },
    [polygons],
  );

  /**
   * 학교필터가 변경될때, 맵에 그려져있는 학구도 폴리곤을 없앤다.
   */
  useEffect(() => {
    setPolygons([]);
    setSelectedMarker(null);
  }, [schoolType]);

  /**
   * 필터의 거래종류가 바뀔때, 가격정보표시도 바꾼다.
   */
  useEffect(() => {
    if (filter.buyOrRents === '2,3') {
      setPriceType('rent');
    } else {
      setPriceType('buy');
    }
  }, [filter.buyOrRents]);

  /**
   * 가격정보표시가 바뀔때 필터의 거래종류도 바꾼다.
   */
  useEffect(() => {
    if (priceType === 'rent') {
      handleChangeFilter({ buyOrRents: '2,3' });
    } else {
      handleChangeFilter({ buyOrRents: '1' });
    }
  }, [handleChangeFilter, priceType]);

  /**
   * 필터의 거래종류가 바뀔때 가격필터를 초기화한다
   */
  useEffect(() => {
    const { priceRange, depositRange, rentRange } = getDefaultFilterAptOftl();
    handleChangeFilter({
      priceRange,
      depositRange,
      rentRange,
    });
  }, [filter.buyOrRents, handleChangeFilter]);

  // Map Control Handlers

  const morphToCurrentLocation = useCallback(() => {
    setIsGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        // 이 좌표를 로컬스토리지에 저장해서, 나중에 지도 로드할때 초기 위치로 설정한다.
        const latlng = { lat: coords.latitude, lng: coords.longitude };
        setMyMarker(latlng);
        localStorage.setItem(USER_LAST_LOCATION, JSON.stringify(latlng));
        mapState?.naverMap?.morph(latlng, DEFAULT_ZOOM);
        setIsGeoLoading(false);
      },
      () => {
        toast.error('위치정보 접근이 허용되어있지 않습니다.');
        setIsGeoLoading(false);
      },
    );
  }, [mapState?.naverMap]);

  // dispatch negocio map events, not being used at the moment.

  useEffect(() => {
    Object.values(window.Negocio.mapEventListeners.bounds).forEach((cb) => {
      cb(bounds);
    });
  }, [bounds]);

  useEffect(() => {
    Object.values(window.Negocio.mapEventListeners.filter).forEach((cb) => {
      cb(filter);
    });
  }, [filter]);

  useEffect(() => {
    Object.values(window.Negocio.mapEventListeners.toggle).forEach((cb) => {
      cb(mapToggleValue);
    });
  }, [mapToggleValue]);

  useEffect(() => {
    window.Negocio.callbacks.selectMarker = (marker: CommonMarker) => {
      setSelectedMarker(marker);
    };

    return () => {
      delete window.Negocio.callbacks.selectMarker;
    };
  }, [mapState.naverMap]);

  return {
    // common map handlers and properties
    minZoom: DEFAULT_MIN_ZOOM,
    maxZoom: DEFAULT_MAX_ZOOM,
    zoom: initialZoom,
    center: initialCenter,
    centerAddress,
    onInit,
    onCreate,
    onClick: onMapClick,
    onBoundsChanged,
    onIdle,
    onZoomStart,
    // ones with business logics
    isGeoLoading,
    myMarker,
    recentSearches,
    streetViewEvent,
    // selectedDanjiSummary,
    filter,
    listingCount,
    markers,
    schoolMarkers,
    bounds,
    mapType,
    mapLayer,
    priceType,
    schoolType,
    mapToggleValue,
    morphToCurrentLocation,
    zoomIn,
    zoomOut,
    handleChangeMapType,
    handleChangeMapLayer,
    handleChangeSchoolType,
    handleMapSearch,
    handleChangeFilter,
    handleChangeMapToggleValue,
    handleChangePriceType,
    handleCloseStreetView,
    clearRecentSearches,
    removeRecentSearch,
    popup,
    setPopup,
    selectedMarker,
    danjiSummary,
  };
}
