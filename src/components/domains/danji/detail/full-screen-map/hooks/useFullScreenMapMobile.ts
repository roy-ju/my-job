/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useMemo, useCallback, useEffect } from 'react';

import { getZoomByMeters } from '@/utils/map';

import { DanjiDetailResponse } from '@/services/danji/types';

const defaultMapSize: string = '200px';

export default function useFullScreenMapMobile({ danji }: { danji: DanjiDetailResponse }) {
  const [mapType, setMapType] = useState<string>();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [pano, setPano] = useState<naver.maps.Panorama | null>(null);
  const [streetViewLayer, setStreetViewLayer] = useState<naver.maps.StreetLayer | null>(null); // 거리뷰 레이어

  const [clickedCenter, setClickedCenter] = useState<{
    lat: number;
    lng: number;
  }>();

  const mapHeight: string = useMemo(() => defaultMapSize, []);

  const center = useMemo(() => {
    if (danji?.lat && danji?.long) {
      return {
        lat: +danji.lat,
        lng: +danji.long,
      };
    }
  }, [danji]);

  const minZoom = useMemo(() => getZoomByMeters(20000), []);
  const maxZoom = useMemo(() => getZoomByMeters(5), []);

  const onCreate = useCallback(
    (m: naver.maps.Map) => {
      setMap(m);

      if (danji?.lat && danji?.long) {
        m.morph({ lat: +danji.lat, lng: +danji.long }, 16);
      }
    },
    [danji],
  );

  const bindPanorama = useCallback((val: naver.maps.Panorama | null) => {
    setPano(val);
  }, []);

  const updateMapType = useCallback((v: string) => {
    setMapType(v);
  }, []);

  const updateClickedCenter = useCallback((v: { lat: number; lng: number }) => {
    setClickedCenter(v);
  }, []);

  useEffect(() => {
    if (!map) return;

    const streetLayer = new naver.maps.StreetLayer();

    if (mapType === 'roadlayer') {
      streetLayer.setMap(map);
      setStreetViewLayer(streetLayer);
    }

    if (mapType !== 'roadlayer') {
      streetViewLayer?.setMap(null);
    }

    naver.maps.Event.addListener(map, 'click', (e) => {
      const latlng = e.coord;

      if (streetLayer.getMap()) {
        setMapType('road');
        setClickedCenter({ lat: latlng.y, lng: latlng.x });
      }
    });
  }, [mapType, map]);

  useEffect(() => {
    if (clickedCenter && pano) {
      pano.setPosition({ x: +clickedCenter.lng, y: +clickedCenter.lat });
    }
  }, [pano, clickedCenter, mapType]);

  return {
    mapType,
    map,
    streetViewLayer,
    mapHeight,
    center,
    minZoom,
    maxZoom,
    onCreate,
    bindPanorama,
    updateMapType,
    updateClickedCenter,
  };
}
