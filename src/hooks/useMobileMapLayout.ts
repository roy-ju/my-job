import { ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import { toast } from 'react-toastify';

import debounce from 'lodash/debounce';

import { getDefaultFilterAptOftl } from '@/components/domains/map/utils/getDefaultFilters';

import mobileMapAtom from '@/states/atom/mobileMap';

import useSessionStorage from '@/hooks/useSessionStorage';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import { coordToRegion } from '@/lib/kakao';

import { NaverMap } from '@/lib/navermap';

import { NaverLatLng } from '@/lib/navermap/types';

import { getMetersByZoom } from '@/lib/navermap/utils';

import { MapSearchResponse, MapSearchLevelOneResponse } from '@/services/map/types';

import mapSearch from '@/services/map/mapSearchLevel';

import getSchools from '@/apis/map/mapSchools';

import getHakgudo from '@/apis/map/mapHakgudos';

import getDanjiSummary from '@/apis/map/mapDanjiSummary';

import getListingSummary from '@/apis/map/mapListingSummary';

import Routes from '@/router/routes';

import getCurrentPosition from '@/utils/getCurrentPosition';

import { CommonMapMarker, CommonSchoolMarker } from '@/types/mobileMarkers';

import { Filter } from '@/components/domains/map/mobile-map-filter/types';

const USER_LAST_LOCATION = 'mob_user_last_location';

const DEFAULT_LAT = 37.3945005; // 판교역

const DEFAULT_LNG = 127.1109415;

const DEFAULT_ZOOM = 15; // 300m

const DEFAULT_MIN_ZOOM = 8; // 30km

const DEFAULT_MAX_ZOOM = 19; // 20m

export interface DanjiSummary {
  id: string;
  name: string;
  householdCount: number;
  buyListingCount: number;
  rentListingCount: number;
  suggestCount: number;
  realestateType: number;
  buyPrice: number;
  latestDealDateBuy?: string;
  latestDealDateRent?: string;
  danjiID?: number;
  rentPrice: number;
  saedaeCount: number;
  string?: string;
  useAcceptedYear?: string;
}

export interface ListingSummary {
  biddingMonthlyRentFee: number;
  biddingTradeOrDepositPrice: number;
  buyOrRent: number;
  gonggeupArea: string;
  jeonyoungArea: string;
  listingId: number;
  listingTitle: string;
  monthlyRentFee: number;
  negotiationOrAuction: number;
  negotiationTarget: number;
  realestateType: number;
  tradeOrDepositPrice: number;
}

export interface MapBounds {
  mapLevel: number;
  sw: { lat: number; lng: number };
  ne: { lat: number; lng: number };
  nw: { lat: number; lng: number };
  se: { lat: number; lng: number };
}

/**
 * 현재 지도 위치정보를 쿼리파라미터에 저장한다.
 */
function setMapState(map: NaverMap) {
  // const zoom = map.getZoom();
  const zoom = DEFAULT_ZOOM;
  const center = map.getCenter() as NaverLatLng;

  const ms = [center.lat(), center.lng(), zoom].join(',');
  window.sessionStorage.setItem('mobMs', ms);
}

/**
 * ms 쿼리파라미터를 가지고 온다. 가지고 올 수 없으면 지정한 default 값을 반환한다.
 */
function getMapState<T>(cb: (ms: string[]) => T, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const item = window.sessionStorage.getItem('mobMs');
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
export default function useMobileMapLayout() {
  const router = useRouter();

  const [map, setMap] = useRecoilState(mobileMapAtom); // 지도 레이아웃을 가진 어느 페이지에서간에 map 을 사용할수있도록한다. useMap 훅을 사용

  const [isGeoLoading, setIsGeoLoading] = useState(false);

  const [myMarker, setMyMarker] = useState<{ lat: number; lng: number } | null>(null);

  const abortControllerRef = useRef<AbortController>();

  const [mapType, setMapType] = useState('normal');

  const [mapLayer, setMapLayer] = useState('none');

  const [schoolType, setSchoolType] = useState('none');

  const [priceType, setPriceType] = useState('buy');

  const mapLayerRef = useRef<naver.maps.LabelLayer | null>(null); // 지적도, 거리뷰 레이어

  const [centerAddress, setCenterAddress] = useState(['서울특별시', '중구', '남대문로2가']); // 맵 중앙 주소

  const [bounds, setBounds] = useState<MapBounds | null>(null);

  const [filter, setFilter] = useSessionStorage<Filter>('mobMapFilter', getDefaultFilterAptOftl());

  const [listingCount, setListingCount] = useState(0);

  const [markers, setMarkers] = useState<CommonMapMarker[]>([]);

  const [schoolMarkers, setSchoolMarkers] = useState<CommonSchoolMarker[]>([]);

  const [polygons, setPolygons] = useState<naver.maps.Polygon[]>([]);

  const [selectedDanjiSummary, setSelectedDanjiSummary] = useState<DanjiSummary | null>(null);

  const [selctedListingSummary, setSelectedListingSummary] = useState<ListingSummary | null>(null);

  const lastSearchItem = useRef<KakaoAddressAutocompleteResponseItem | null>(null);

  const [selectedSchoolID, setSelectedSchoolID] = useState('');

  const [popup, setPopup] = useState('none');

  const [streetViewEvent, setStreetViewEvent] = useState<{
    address: string;
    latlng: naver.maps.LatLng;
  } | null>(null);

  const [mapToggleValue, setMapToggleValue] = useState(0);

  const isPanningRef = useRef(false);

  const [code, setCode] = useState<string>();

  const handleChangeMapToggleValue = useCallback((newValue: number) => {
    setMapToggleValue(newValue);
  }, []);

  const handleChangePriceType = useCallback((newValue: string) => {
    setPriceType(newValue);
  }, []);

  const handleCloseStreetView = useCallback(() => {
    setStreetViewEvent(null);
  }, []);

  /**
   * 지도 중심좌표를 reverse geocoding 한다.
   */
  const handleCenterAddressChange = useCallback(async (_map: NaverMap) => {
    const center = _map.getCenter() as NaverLatLng;
    const response = await coordToRegion(center.x, center.y);

    if (response && response.documents?.length > 0) {
      const region = response.documents.filter((item) => item.region_type === 'B')[0];
      if (region) {
        setCode(region.code);
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

  /**
   * 단지/매물을 선택한다. (선택이란, 단지마커 애니메이션을 활성화하고 마커위에 단지요약정보를 보여준다.)
   */

  const selectMarker = useCallback(
    async ({
      danjiID,
      realestateType,
      listingIds,
    }: {
      danjiID?: number;
      realestateType?: number;
      listingIds?: string;
    }) => {
      if (listingIds) {
        const listingId = listingIds.split(',')[0];
        if (listingId) {
          const summary = await getListingSummary({ listingId: Number(listingId) });
          if (summary) {
            setSelectedListingSummary({
              biddingMonthlyRentFee: summary.bidding_monthly_rent_fee,
              biddingTradeOrDepositPrice: summary.bidding_trade_or_deposit_price,
              buyOrRent: summary.buy_or_rent,
              gonggeupArea: summary.gonggeup_area,
              jeonyoungArea: summary.jeonyoung_area,
              listingId: summary.listing_id,
              listingTitle: summary.listing_title,
              monthlyRentFee: summary.monthly_rent_fee,
              negotiationOrAuction: summary.negotiation_or_auction,
              negotiationTarget: summary.negotiation_target,
              realestateType: summary.realestate_type,
              tradeOrDepositPrice: summary.trade_or_deposit_price,
            });
          }
        }
      } else if (danjiID && realestateType) {
        const summary = await getDanjiSummary({
          danjiId: danjiID,
          buyOrRent: '1,2,3',
          danjiRealestateType: realestateType,
        });
        if (summary) {
          setSelectedDanjiSummary({
            id: `${danjiID}${realestateType}`,
            name: summary?.string ?? '',
            householdCount: summary?.saedae_count ?? 0,
            buyListingCount: summary?.buy_listing_count ?? 0,
            rentListingCount: summary?.rent_listing_count ?? 0,
            realestateType: summary?.realestate_type ?? 0,
            buyPrice: summary?.buy_price ?? 0,
            rentPrice: summary?.rent_price ?? 0,
            latestDealDateBuy: summary?.latest_deal_date_buy,
            latestDealDateRent: summary?.latest_deal_date_rent,
            danjiID: summary?.danji_id,
            saedaeCount: summary?.saedae_count ?? 0,
            string: summary?.string,
            useAcceptedYear: summary?.use_accepted_year,
            suggestCount: summary?.suggest_count ?? 0,
          });
        }
      }
    },
    [],
  );

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

        setMarkers(
          regions?.map((item) => ({
            id: item.bubjungdong_code,
            variant,
            bubjungdongCode: item.bubjungdong_code,
            bubjungdongName: item.bubjungdong_name,
            danjiCount: item.danji_count,
            listingCount: item.listing_count,
            lat: item.lat,
            lng: item.long,
            onClick: () => {
              setPolygons([]);
              setSelectedSchoolID('');
              _map?.morph(
                {
                  lat: item.lat,
                  lng: item.long,
                },
                _map.getZoom() + 2,
              );
            },
          })) ?? [],
        );
      } else if (res && mapBounds.mapLevel === 1) {
        const listings = (res as MapSearchLevelOneResponse).listing_list ?? [];
        const listingMap: {
          [key: string]: CommonMapMarker;
        } = {};

        listings?.map((item) => {
          listingMap[`${item.listing_ids}`] = {
            id: item.listing_ids,
            variant,
            listingCount: item.listing_count,
            lat: item.lat,
            lng: item.long,
            price: priceTypeValue === 'buy' ? item.trade_price : item.deposit,
            // price: item.trade_price || item.deposit || 0,

            onClick: () => {
              if (isPanningRef.current) return;

              if (item.listing_count === 1) {
                router.push(
                  {
                    pathname: `/${Routes.EntryMobile}/${Routes.ListingDetail}`,
                    query: {
                      listingID: item.listing_ids,
                    },
                  },
                  `/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${item.listing_ids}`,
                );
              } else {
                router.push(
                  {
                    pathname: `/${Routes.EntryMobile}/${Routes.MapListingList}`,
                    query: {
                      listingIDs: item.listing_ids,
                      bounds: JSON.stringify(bounds),
                      filter: JSON.stringify(filter),
                    },
                  },
                  `/${Routes.EntryMobile}/${Routes.MapListingList}?listingIDs=${item.listing_ids}`,
                );
              }

              setPolygons([]);
              setSelectedSchoolID('');
              _map?.morph({
                lat: item.lat,
                lng: item.long,
              });
              selectMarker({
                listingIds: item.listing_ids,
              });
            },
          };
        });

        let danjis = (res as MapSearchLevelOneResponse).danji_list ?? [];
        if (variant === 'nego') {
          danjis = danjis?.filter((danji) => danji.listing_count !== 0);
        }

        const danjiMap: {
          [key: string]: CommonMapMarker;
        } = {};

        danjis?.map((item) => {
          danjiMap[`${item.danji_id}${item.danji_realestate_type}`] = {
            id: `${item.danji_id}${item.danji_realestate_type}`,
            variant,
            danjiID: item.danji_id,
            danjiRealestateType: item.danji_realestate_type,
            pyoung: item.pyoung,
            price: item.price,
            jibunAddress: item.jibun_address,
            roadNameAddress: item.road_name_address,
            listingCount: item.listing_count,
            lat: item.lat,
            lng: item.long,
            onClick: () => {
              setPolygons([]);
              setSelectedSchoolID('');
              _map?.morph({
                lat: item.lat,
                lng: item.long,
              });
              selectMarker({
                danjiID: item.danji_id,
                realestateType: item.danji_realestate_type,
              });
            },
          };
        });

        // 맵의 주소검색 결과에 마커가 포함되어있으면, 마커를 선택한다.
        if (lastSearchItem.current) {
          const searchedDanji = danjis?.find(
            ({ jibun_address, road_name_address }) =>
              lastSearchItem.current?.roadAddressName === road_name_address ||
              lastSearchItem.current?.addressName === jibun_address,
          );
          if (searchedDanji) {
            _map?.morph({
              lat: searchedDanji.lat,
              lng: searchedDanji.long,
            });
            selectMarker({
              danjiID: searchedDanji.danji_id,
              realestateType: searchedDanji.danji_realestate_type,
            });
          }
          lastSearchItem.current = null;
        }

        // 오버랩되는 중복 마커 겹침 처리 로직
        const memory = new Set<string>();
        const _markers = [...Object.values(danjiMap), ...Object.values(listingMap)];

        _markers.forEach((marker) => {
          const key = `${marker.lat.toFixed(4)},${marker.lng.toFixed(4)}`;
          if (memory.has(key)) {
            marker.lng += 0.00035;
          } else {
            memory.add(key);
          }
        });

        setMarkers(_markers);
      }
    },
    [selectMarker, router, bounds, filter],
  );

  /**
   * 학교 마커를 그린다.
   */
  const updateSchoolMarkers = useCallback(async (_map: NaverMap, mapBounds: MapBounds, st: string) => {
    const schoolTypes = st === 'elementary' ? '1' : st === 'middle' ? '2' : '3';

    const res = await getSchools({ schoolTypes, bounds: mapBounds });
    setSchoolMarkers(
      res?.list?.map((item) => ({
        id: item.school_id,
        lat: item.lat,
        lng: item.long,
        name: item.school_name.replace('등학교', ''),
        type: st,
        onClick: async () => {
          const hakgudoRes = await getHakgudo(item.school_id);
          setPolygons(
            hakgudoRes?.list?.map((p: any) => {
              const paths = JSON.parse(p.polygons as string)?.coordinates[0][0];
              const poly = new naver.maps.Polygon({
                map: _map,
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
          setSelectedSchoolID(item.school_id);
          _map.morph({
            lat: item.lat,
            lng: item.long,
          });
        },
      })) ?? [],
    );
  }, []);

  /**
   * 지도 코너 좌표값을 업데이트 한다.
   */
  const updateBounds = useCallback((m: NaverMap) => {
    let mapLevel = -1;

    const meters = getMetersByZoom(m.getZoom());

    if (meters <= 100) {
      mapLevel = 1;
    } else if (meters <= 300) {
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
      getCurrentPosition(
        ({ lat, lng }) => {
          setIsGeoLoading(false);
          const latlng = {
            lat,
            lng,
          };
          setMyMarker(latlng);
          localStorage.setItem(USER_LAST_LOCATION, JSON.stringify(latlng));
          m?.morph(latlng, DEFAULT_ZOOM);
        },
        () => {
          setIsGeoLoading(false);
        },
      );
    }
  }, []);

  /**
   * 사용자가 지도에서 마우스 왼쪽 버튼을 클릭하면 이벤트가 발생한다.
   * 단, 오버레이(지도마커)를 클릭했을 때는 이벤트가 발생하지 않는다.
   */
  const onMapClick = useCallback(
    async (_map: NaverMap, e: { latlng: naver.maps.LatLng }) => {
      setSelectedSchoolID('');
      setSelectedDanjiSummary(null);
      setSelectedListingSummary(null);
      setPolygons([]);

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
    [mapLayer],
  );

  /**
   * 지도의 움직임이 종료되면(유휴 상태) 이벤트가 발생한다.
   */
  const onIdle = useMemo(
    () =>
      debounce(
        (_map: NaverMap) => {
          setTimeout(() => {
            isPanningRef.current = false;
          }, 100);
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

  /**
   *  지도가 움직일때 발생한다.
   */
  const onBoundsChanged = useCallback(() => {
    isPanningRef.current = true;
  }, []);

  const removeMyMarker = () => {
    setMyMarker(null);
  };

  /**
   * 줌 효과가 시작될때, 이벤트가 발생한다.
   */
  const onZoomStart = useCallback(
    (_map: NaverMap) => {
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

      if (bounds?.mapLevel && bounds.mapLevel > 1) {
        setSelectedDanjiSummary(null);
      }
    },
    [bounds?.mapLevel],
  );

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
  }, [selectedDanjiSummary]);

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

  /**
   * 맵이 이동할때마다, 마커를 그린다.
   */
  useEffect(() => {
    if (bounds && map) {
      updateMarkers(map, bounds, filter, mapToggleValue, priceType);
    }
  }, [map, bounds, updateMarkers, filter, mapToggleValue, priceType]);

  /**
   * 학교가 활성화되어있으면, 맵이 이동할때마다 학교 마커를 그린다.
   */
  useEffect(() => {
    if (bounds && schoolType !== 'none' && map) {
      if (bounds.mapLevel < 3) {
        updateSchoolMarkers(map, bounds, schoolType);
      } else {
        toast.error('지도를 확대하여 학교마커를 확인하세요.', { toastId: 'schoolMarkerError' });
        setSchoolMarkers([]);
        setPolygons([]);
      }
    } else if (schoolType === 'none') {
      setSchoolMarkers([]);
    }
  }, [map, bounds, schoolType, updateSchoolMarkers]);

  /**
   * 학교필터가 변경될때, 맵에 그려져있는 학구도 폴리곤을 없앤다.
   */
  useEffect(() => {
    setPolygons([]);
  }, [schoolType]);

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
   * 필터의 거래종류가 바뀔때, 가격정보표시도 바꾼다.
   */
  useEffect(() => {
    if (filter.buyOrRents === '2,3') {
      setPriceType('rent');
    } else {
      setPriceType('buy');
    }
  }, [filter.buyOrRents]);

  // Map Control Handlers

  const morphToCurrentLocation = useCallback(() => {
    setIsGeoLoading(true);
    getCurrentPosition(
      ({ lat, lng }) => {
        setIsGeoLoading(false);
        const latlng = {
          lat,
          lng,
        };
        setMyMarker(latlng);
        localStorage.setItem(USER_LAST_LOCATION, JSON.stringify(latlng));
        map?.morph(latlng, DEFAULT_ZOOM);
      },
      () => {
        setIsGeoLoading(false);
        if (navigator.userAgent.includes('(NegocioUserApp)')) {
          setPopup('locationPermissionNative');
        } else {
          setPopup('locationPermission');
        }
      },
    );
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
          map.setMapTypeId(naver.maps.MapTypeId.HYBRID);
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
      // 마커 API 응답후, 주소로 마커를 선택하기위해서 저장해둔다.
      lastSearchItem.current = item;
    },
    [map, lastSearchItem],
  );

  const handleChangeFilter = useCallback(
    (value: Partial<Filter>) => {
      setSelectedDanjiSummary(null);
      setSelectedListingSummary(null);
      setFilter((prev) => {
        const old = prev === null ? getDefaultFilterAptOftl() : prev;
        return {
          ...old,
          ...value,
        };
      });
    },
    [setFilter],
  );

  const handleClickMapListingList = useCallback(() => {
    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.MapListingList}`,
      query: {
        bounds: JSON.stringify(bounds),
        filter: JSON.stringify(filter),
        mapToggleValue: `${mapToggleValue}`,
      },
    });
  }, [router, bounds, filter, mapToggleValue]);

  useIsomorphicLayoutEffect(() => {
    if (router?.query?.listing === 'listingBtn') {
      setMapToggleValue(0);
      setPriceType('buy');
      setFilter(getDefaultFilterAptOftl());
    }
  }, [router.query, setFilter]);

  return {
    // common map handlers and properties
    minZoom: DEFAULT_MIN_ZOOM,
    maxZoom: DEFAULT_MAX_ZOOM,
    zoom: initialZoom,
    center: initialCenter,
    centerAddress,
    code,
    onInit,
    onCreate,
    onClick: onMapClick,
    onBoundsChanged,
    onIdle,
    onZoomStart,
    // ones with business logics
    streetViewEvent,
    selectedDanjiSummary,
    selctedListingSummary,
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
    selectedSchoolID,
    isGeoLoading,
    myMarker,
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
    handleClickMapListingList,
    popup,
    setPopup,
    removeMyMarker,
  };
}
