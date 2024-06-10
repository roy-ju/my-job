/* eslint-disable react-hooks/exhaustive-deps */

import { useMemo, useState, useEffect, useRef } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export default function useBasicInfoDanjiMapStreetMobile({
  containerId,
  defaultMapSize,
  center,
  bindPanorama,
}: {
  containerId: string;
  defaultMapSize: string;
  center?: {
    lat: number;
    lng: number;
  };
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

  useEffect(
    () => () => {
      setPanorama(null);
      if (bindPanorama) {
        bindPanorama(null);
      }
    },
    [],
  );

  return { containerRef, mapHeight };
}
