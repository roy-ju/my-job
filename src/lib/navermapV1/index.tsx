import React, { useEffect, useRef, useState } from 'react';

import { styled } from 'twin.macro';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { useNetwork } from './useNetwork';

import useNaverMapEvent from '../navermap/hooks/useNaverEvent';

const MapContainer = styled.div`
  flex: 1;
  outline: none;
`;

export const NaverMapContext = React.createContext<naver.maps.Map>(undefined as unknown as naver.maps.Map);

export type NaverMapProps = {
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  center?: { lat: number; lng: number };
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  draggable?: boolean;
  mapHeight?: string | number;
  onCreate?: (map: naver.maps.Map) => void;
  onZoomChanged?: (map: naver.maps.Map) => void;
  onZooming?: (map: naver.maps.Map) => void;
  onDragEnd?: (map: naver.maps.Map) => void;
  onBoundsChanged?: (map: naver.maps.Map) => void;
  onIdle?: (map: naver.maps.Map) => void;
  onClickMap?: (map: naver.maps.Map, e?: naver.maps.PointerEvent) => void;
};

export function NaverMapV1({
  id = 'map',
  children,
  style,
  center,
  zoom = 14,
  minZoom = 8,
  maxZoom = 19,
  draggable = true,
  onCreate,
  onZoomChanged,
  onZooming,
  onDragEnd,
  onBoundsChanged,
  onIdle,
  mapHeight,
  onClickMap,
}: NaverMapProps) {
  const isOnline = useNetwork();
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!isOnline) {
      setMap((prev) => {
        prev?.destroy();
        return null;
      });
      return;
    }

    setMap((prev) => {
      if (!containerRef.current) return null;
      if (!naver.maps) return null;

      prev?.destroy();

      try {
        const m = new naver.maps.Map(containerRef.current, {
          center: center ? new naver.maps.LatLng(center.lat, center.lng) : undefined,
          zoom,
          minZoom,
          maxZoom,
          draggable,
          disableKineticPan: false,
          mapDataControl: false,
        });

        return m;
      } catch (e) {
        return null;
      }
    });
  }, [center, zoom, minZoom, maxZoom, draggable, isOnline]);

  useEffect(() => {
    const callback = () => {
      if (!containerRef.current || !map) return;
      if (!naver.maps) return;
      const { offsetWidth, offsetHeight } = containerRef.current;

      const size = new naver.maps.Size(offsetWidth, offsetHeight);

      map.setSize(size);
    };

    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [map, mapHeight]);

  useEffect(() => {
    if (!map || !onCreate) return;

    onCreate(map);
  }, [map, onCreate]);

  useNaverMapEvent(map, 'zooming', onZooming);
  useNaverMapEvent(map, 'zoom_changed', onZoomChanged);
  useNaverMapEvent(map, 'dragend', onDragEnd);
  useNaverMapEvent(map, 'bounds_changed', onBoundsChanged);
  useNaverMapEvent(map, 'idle', onIdle);
  useNaverMapEvent(map, 'click', onClickMap);

  return (
    <>
      <MapContainer id={id} ref={containerRef} style={{ ...style }} />
      {map && <NaverMapContext.Provider value={map}>{children}</NaverMapContext.Provider>}
    </>
  );
}
