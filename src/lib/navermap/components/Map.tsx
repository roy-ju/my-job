import { createContext, memo, ReactNode, useRef, useState } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import useNaverMapEvent from '../hooks/useNaverEvent';

import { NaverLatLngBounds, NaverMap } from '../types';

export const NaverMapContext = createContext<NaverMap>(undefined as unknown as NaverMap);

export type MapProps = {
  id?: string;
  center: { lat: number; lng: number };
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  mapType?: string;
  onInit?: (map: NaverMap) => void;
  onCreate?: (map: NaverMap) => void;
  onBoundsChanged?: (map: NaverMap, bounds: NaverLatLngBounds) => void;
  onZoomChanged?: (map: NaverMap, zoom: number) => void;
  onZooming?: (map: NaverMap, zoom: number) => void;
  onZoomStart?: (map: NaverMap, zoom: number) => void;
  onPanning?: (map: NaverMap) => void;
  onIdle?: (map: NaverMap) => void;
  onClick?: (map: NaverMap, ...args: any[]) => void;
  children?: ReactNode;
};

export default memo(
  ({
    id,
    center,
    zoom,
    minZoom,
    maxZoom,
    mapType,
    onInit,
    onCreate,
    onBoundsChanged,
    onZoomChanged,
    onZooming,
    onZoomStart,
    onPanning,
    onIdle,
    onClick,
    children,
  }: MapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<NaverMap>();

    useIsomorphicLayoutEffect(() => {
      const mapContainer = container.current;

      if (!mapContainer) {
        return () => {};
      }

      if (window.naver.maps === null) {
        return () => {};
      }

      const naverMap = new naver.maps.Map(mapContainer, {
        center: new naver.maps.LatLng(center.lat, center.lng),
        zoom,
        minZoom: 8 || minZoom,
        maxZoom: 19 || maxZoom,
        mapTypeId: mapType ?? naver.maps.MapTypeId.NORMAL,
        disableKineticPan: false,
      });

      setMap(naverMap);

      return () => {
        if (naverMap) {
          naverMap.destroy();
        }
      };
    }, []);

    useIsomorphicLayoutEffect(() => {
      if (!map || !onCreate) return;
      onCreate(map);
    }, [map, onCreate]);

    useIsomorphicLayoutEffect(() => {
      if (!map) return;
      const prevCenter = map.getCenter() as naver.maps.LatLng;
      const centerPos = new naver.maps.LatLng(center.lat, center.lng);

      if (prevCenter.equals(centerPos)) {
        return;
      }
      map.setCenter(centerPos);
    }, [map, center.lat, center.lng]);

    useIsomorphicLayoutEffect(() => {
      if (!map || !zoom) return;
      map.setZoom(zoom);
    }, [map, zoom]);

    useIsomorphicLayoutEffect(() => {
      if (!map || !mapType) return;
      map.setMapTypeId(mapType);
    }, [map, mapType]);

    useNaverMapEvent(map, 'zooming', onZooming);
    useNaverMapEvent(map, 'bounds_changed', onBoundsChanged);
    useNaverMapEvent(map, 'zoom_changed', onZoomChanged);
    useNaverMapEvent(map, 'idle', onIdle);
    useNaverMapEvent(map, 'click', onClick);
    useNaverMapEvent(map, 'init', onInit);
    useNaverMapEvent(map, 'zoomstart', onZoomStart);
    useNaverMapEvent(map, 'panning', onPanning);

    return (
      <>
        <div tw="h-full w-full" id={id || 'negocio-naver-map'} ref={container} />
        {map && <NaverMapContext.Provider value={map}>{children}</NaverMapContext.Provider>}
      </>
    );
  },
);
