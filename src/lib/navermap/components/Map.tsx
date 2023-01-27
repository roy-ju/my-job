import { useIsomorphicLayoutEffect } from '@/hooks';
import { createContext, useRef, useState } from 'react';
import useNaverMapEvent from '../hooks/useNaverEvent';

export const NaverMapContext = createContext<naver.maps.Map>(
  undefined as unknown as naver.maps.Map,
);

export type MapProps = {
  id?: string;
  center: { lat: number; lng: number };
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  onCreate?: (map: naver.maps.Map) => void;
  onBoundsChanged?: (
    map: naver.maps.Map,
    bounds: naver.maps.LatLngBounds,
  ) => void;
  onZoomChanged?: (map: naver.maps.Map, zoom: number) => void;
  onIdle?: (map: naver.maps.Map) => void;
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
  const [map, setMap] = useState<naver.maps.Map>();

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
