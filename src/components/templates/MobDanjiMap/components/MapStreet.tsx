/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable func-names */

import React, { useMemo, useState, useEffect, useRef } from 'react';

import { styled } from 'twin.macro';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

const MapContainer = styled.div`
  flex: 1;
  outline: none;
`;

export const NaverPanoramaContext = React.createContext<naver.maps.Panorama>(
  undefined as unknown as naver.maps.Panorama,
);

export function MapStreet({
  defaultMapSize = '190px',
  center,
  containerId = 'panorama',
  isFullScreen = false,
  bindPanorama,
}: {
  defaultMapSize?: string;
  center?: {
    lat: number;
    lng: number;
  };
  containerId?: string;
  isFullScreen?: boolean;
  bindPanorama?: (val: naver.maps.Panorama | null) => void;
}) {
  const [panorama, setPanorama] = useState<naver.maps.Panorama | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mapHeight: string = useMemo(() => defaultMapSize, []);

  useIsomorphicLayoutEffect(() => {
    setPanorama(() => {
      const container = document.getElementById(containerId);

      if (!naver.maps) return null;
      if (!container) return null;

      try {
        const pano = new naver.maps.Panorama(container, {
          position: center ? new naver.maps.LatLng(center.lat, center.lng) : undefined,
          logoControlOptions: { position: naver.maps.Position.LEFT_BOTTOM },
          zoomControl: false,
          flightSpot: false,
          aroundControl: false,
          aroundControlOptions: { position: naver.maps.Position.LEFT_TOP },
          visible: false,
          pov: {
            pan: -105,
            tilt: 10,
            fov: 100,
          },
          minScale: 0,
          maxScale: 10,
          minZoom: 0,
          maxZoom: 4,
        });
        return pano;
      } catch (e) {
        return null;
      }
    });
  }, []);

  useEffect(() => {
    if (panorama) {
      naver.maps.Event.addListener(panorama, 'pano_status', (status: string) => {
        if (status === 'OK') {
          panorama?.setVisible(true);
        } else if (status !== 'OK') {
          panorama?.setVisible(false);
        }
      });
      if (bindPanorama) {
        bindPanorama(panorama);
      }
    }
  }, [panorama]);

  // useEffect(() => {
  //   const callback = () => {
  //     if (!containerRef.current || !panorama || !isFullScreen) return;
  //     if (!naver.maps) return;
  //     const { offsetWidth, offsetHeight } = containerRef.current;

  //     const size = new naver.maps.Size(offsetWidth, offsetHeight);

  //     panorama.setSize(size);
  //   };

  //   window.addEventListener('resize', callback);
  //   return () => window.removeEventListener('resize', callback);
  // }, [containerId, panorama, mapHeight, isFullScreen]);

  useEffect(
    () => () => {
      setPanorama(null);
      if (bindPanorama) {
        bindPanorama(null);
      }
    },
    [],
  );

  return (
    <>
      <MapContainer
        ref={containerRef}
        style={
          isFullScreen
            ? {
                flex: 1,
                outline: 'none',
              }
            : {}
        }
      />
      <div
        id={containerId}
        style={{
          position: 'relative',
          width: '100%',
          height: mapHeight,
          zIndex: 2,
        }}
      />
    </>
  );
}
