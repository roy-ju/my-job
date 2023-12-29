/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import MapMarkerSearchItem from '@/assets/icons/mob_map_danji_pin.svg';

import { getZoomByMeters } from '@/utils/map';

import { useDanjiMapTypeStore } from '@/states/mob/danjiMapTypeStore';

import { useDanjiMapButtonStore } from '@/states/mob/danjiMapButtonStore';

import { NaverMapV1 } from '@/lib/navermapV1';

import CustomOverlayV1 from '@/lib/navermap/components/CustomOverlayV1';

import { DanjiDetailResponse } from '@/services/danji/types';

import { MapEnlarge } from './MapEnlargeButton';

import { MapTypeButton } from './MapTypeButton';

import { MapStreet } from './MapStreet';

const defaultMapSize: string = '190px';

type MapProps = {
  danji: DanjiDetailResponse;
};

export default function Map({ danji }: MapProps) {
  const danjiMapTypeStore = useDanjiMapTypeStore();

  const danjiMapButtonStore = useDanjiMapButtonStore();

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

  const mapHeight: string = useMemo(() => defaultMapSize, []);

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
    if (!map) return;

    const streetLayer = new naver.maps.StreetLayer();

    if (danjiMapTypeStore.mapType === 'roadlayer') {
      streetLayer.setMap(map);
      setStreetViewLayer(streetLayer);
    }

    if (danjiMapTypeStore.mapType !== 'roadlayer') {
      streetViewLayer?.setMap(null);
    }

    naver.maps.Event.addListener(map, 'click', (e) => {
      const latlng = e.coord;

      if (streetLayer.getMap()) {
        danjiMapTypeStore.makeRoadType();
        setClickedCenter({ lat: latlng.y, lng: latlng.x });
        danjiMapTypeStore.makePanoPosition(latlng.y, latlng.x);
      }
    });
  }, [danjiMapTypeStore.mapType]);

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

  const handleEnlarge = () => {
    danjiMapButtonStore.makeTrue();
  };

  const bindPanorama = (val: naver.maps.Panorama | null) => {
    setPano(val);
  };

  return (
    <div ref={containerRef}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: mapHeight,
        }}
      >
        {!!(danji?.lat && danji?.long) && (
          <>
            <MapEnlarge
              top="12px"
              right="12px"
              handleEnlarge={() => {
                handleEnlarge();
              }}
            />
            <MapTypeButton type={danjiMapTypeStore.mapType} right="12px" bottom="12px" />

            {danjiMapTypeStore.mapType === 'road' && (
              <MapStreet containerId="panorama-small" bindPanorama={bindPanorama} />
            )}

            {(danjiMapTypeStore.mapType === 'map' || danjiMapTypeStore.mapType === 'roadlayer') && (
              <NaverMapV1
                onCreate={onCreate}
                center={center}
                minZoom={minZoom}
                maxZoom={maxZoom}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <CustomOverlayV1
                  position={{
                    lat: danji.lat,
                    lng: danji.long,
                  }}
                >
                  <MapMarkerSearchItem style={{ width: '32px', height: '32px', opacity: 0.9 }} tw="animate-bounce" />
                  <div tw="w-8 h-[11px] absolute bottom-0 bg-nego-1000 opacity-20 [border-radius: 50%]" />
                </CustomOverlayV1>
              </NaverMapV1>
            )}
          </>
        )}
      </div>
    </div>
  );
}
