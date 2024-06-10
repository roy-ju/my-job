import { useCallback, useMemo, useRef, useState, useEffect } from 'react';

import { getZoomByMeters } from '@/utils/map';

import { DanjiDetailResponse } from '@/services/danji/types';

export default function useBasicInfoDanjiMapMobile({ danji }: { danji: DanjiDetailResponse }) {
  const [streetViewLayer, setStreetViewLayer] = useState<naver.maps.StreetLayer | null>(null);

  const [clickedCenter, setClickedCenter] = useState<{
    lat: number;
    lng: number;
  }>();

  const [pano, setPano] = useState<naver.maps.Panorama | null>(null);

  const [map, setMap] = useState<naver.maps.Map | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const minZoom = useMemo(() => getZoomByMeters(20000), []);
  const maxZoom = useMemo(() => getZoomByMeters(5), []);

  const mapHeight: string = useMemo(() => '190px', []);

  const bindPanorama = useCallback((val: naver.maps.Panorama | null) => {
    setPano(val);
  }, []);

  const updateStreeViewLayer = useCallback((v: naver.maps.StreetLayer) => {
    setStreetViewLayer(v);
  }, []);

  const updateClickedCenter = useCallback((v: { lat: number; lng: number }) => {
    setClickedCenter(v);
  }, []);

  const onCreate = useCallback(
    (m: naver.maps.Map) => {
      setMap(m);

      if (danji?.lat && danji?.long) {
        m.morph({ lat: +danji.lat, lng: +danji.long }, 16);

        m.setOptions('logoControlOptions', {
          position: naver.maps.Position.BOTTOM_LEFT,
        });

        m.setOptions('scaleControlOptions', {
          position: naver.maps.Position.BOTTOM_LEFT,
        });
      }
    },
    [danji],
  );

  useEffect(() => {
    if (clickedCenter && pano) {
      pano.setPosition({ x: +clickedCenter.lng, y: +clickedCenter.lat });
    }
  }, [pano, clickedCenter]);

  useEffect(() => {
    if (danji?.lat && danji?.long) {
      setClickedCenter({ lat: +danji.lat, lng: +danji.long });
    }
  }, [danji]);

  const center = useMemo(() => {
    if (danji?.lat && danji?.long) {
      return {
        lat: +danji.lat,
        lng: +danji.long,
      };
    }
  }, [danji]);

  return {
    streetViewLayer,
    clickedCenter,
    pano,
    map,
    containerRef,
    minZoom,
    maxZoom,
    mapHeight,
    center,
    onCreate,
    updateStreeViewLayer,
    updateClickedCenter,
    bindPanorama,
  };
}
