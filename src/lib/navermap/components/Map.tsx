import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import { createContext, useRef, useState } from 'react';
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
  onCreate?: (map: NaverMap) => void;
  onBoundsChanged?: (map: NaverMap, bounds: NaverLatLngBounds) => void;
  onZoomChanged?: (map: NaverMap, zoom: number) => void;
  onIdle?: (map: NaverMap) => void;
};

export default function Map({
  id,
  center,
  zoom,
  minZoom,
  maxZoom,
  onCreate,
  onBoundsChanged,
  onZoomChanged,
  onIdle,
}: MapProps) {
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

  useNaverMapEvent(map, 'bounds_changed', onBoundsChanged);
  useNaverMapEvent(map, 'zoom_changed', onZoomChanged);
  useNaverMapEvent(map, 'idle', onIdle);

  return (
    <div
      className="h-full w-full"
      id={id || 'negocio-naver-map'}
      ref={container}
    />
  );
}
