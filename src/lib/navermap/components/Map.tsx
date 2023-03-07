import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import { createContext, memo, ReactNode, useRef, useState } from 'react';
import useNaverMapEvent from '../hooks/useNaverEvent';
import { NaverLatLngBounds, NaverMap } from '../types';

export const NaverMapContext = createContext<NaverMap>(
  undefined as unknown as NaverMap,
);

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
  onIdle?: (map: NaverMap) => void;
  onClick?: (map: NaverMap) => void;
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
    onIdle,
    onClick,
    children,
  }: MapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<NaverMap>();

    useIsomorphicLayoutEffect(() => {
      const mapContainer = container.current;

      if (!mapContainer) return () => {};

      const naverMap = new naver.maps.Map(mapContainer, {
        center: new naver.maps.LatLng(center.lat, center.lng),
        zoom,
        minZoom: 8 || minZoom,
        maxZoom: 19 || maxZoom,
        mapTypeId: mapType ?? naver.maps.MapTypeId.NORMAL,
      });

      setMap(naverMap);

      return () => {
        naverMap.destroy();
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

    useNaverMapEvent(map, 'bounds_changed', onBoundsChanged);
    useNaverMapEvent(map, 'zoom_changed', onZoomChanged);
    useNaverMapEvent(map, 'idle', onIdle);
    useNaverMapEvent(map, 'click', onClick);
    useNaverMapEvent(map, 'init', onInit);

    return (
      <>
        <div
          tw="h-full w-full"
          id={id || 'negocio-naver-map'}
          ref={container}
        />
        {map && (
          <NaverMapContext.Provider value={map}>
            {children}
          </NaverMapContext.Provider>
        )}
      </>
    );
  },
);
