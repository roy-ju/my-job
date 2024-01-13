/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState, useCallback, useMemo, ChangeEventHandler } from 'react';

import tw, { theme } from 'twin.macro';

import { Button } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import { MapControls } from '@/components/organisms';

import useMobileDanjiMap from '@/states/hooks/useMobileDanjiMap';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import { getZoomByMeters } from '@/utils/map';

import { NaverMapV1 } from '@/lib/navermapV1';

import CustomOverlayV1 from '@/lib/navermap/components/CustomOverlayV1';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import MapMarkerSearchItem from '@/assets/icons/mob_map_danji_pin.svg';

import MapPinRoad from '@/assets/icons/map_pin_road.svg';

import NaverMapPin from '@/assets/icons/naver_map_pin.svg';

import CloseIcon from '@/assets/icons/close_18.svg';

import { MapStreet } from '../../MobDanjiMap/components/MapStreet';

interface OnClickProps {
  onClick?: () => void;
}

interface SelectableProps extends OnClickProps {
  selected?: boolean;
}

const ButtonText = tw.div`text-info text-gray-1000 mt-1`;

interface MapButtonProps extends SelectableProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function StreetViewButton({ selected = false, onClick }: SelectableProps) {
  return (
    <Button onClick={onClick} tw="flex-col w-10 h-14 hover:bg-gray-300">
      <MapPinRoad color={selected ? theme`colors.nego.1000` : theme`colors.gray.800`} />
      <ButtonText css={[selected && tw`font-bold text-nego-1000`]}>로드</ButtonText>
    </Button>
  );
}

function MapButton({ selected = false, onClick }: MapButtonProps) {
  const handleButtonClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <>
      <Button onClick={handleButtonClick} tw="flex-col w-10 h-14 hover:bg-gray-300">
        <NaverMapPin color={selected ? theme`colors.nego.1000` : theme`colors.gray.800`} />
        <ButtonText css={[selected && tw`font-bold text-nego-1000`]}>지도</ButtonText>
      </Button>
    </>
  );
}

const defaultMapSize: string = '200px';

export default function FullScreenMap({ type, danji }: { type: string; danji?: GetDanjiDetailResponse | any }) {
  const { makeGeneralMap, panoCenter, makePanoInitialize, makeRoadLayer } = useMobileDanjiMap();
  const mobileDanjiInteraction = useMobileDanjiInteraction();

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

  const bindPanorama = (val: naver.maps.Panorama | null) => {
    setPano(val);
  };

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
    setMapType(type);
  }, [type]);

  useEffect(() => {
    if (clickedCenter && pano) {
      pano.setPosition({ x: +clickedCenter.lng, y: +clickedCenter.lat });
    }
  }, [pano, clickedCenter, mapType]);

  useEffect(() => {
    if (panoCenter) {
      setClickedCenter({ lat: +panoCenter.lat, lng: +panoCenter.lng });
    }
  }, [danji, panoCenter]);

  useEffect(
    () => () => {
      makeGeneralMap();
      makePanoInitialize();
      mobileDanjiInteraction.makeShowMapButton();
      mobileDanjiInteraction.makeShowRoadButton();
    },
    [],
  );

  return (
    <div tw="flex flex-col w-full h-full">
      <NavigationHeader>
        <NavigationHeader.Title>{danji.name}</NavigationHeader.Title>
        <Button variant="ghost" tw="p-0" onClick={() => mobileDanjiInteraction.makeFalse()}>
          <CloseIcon />
        </Button>
      </NavigationHeader>
      <div tw="relative flex-1 w-full">
        {mapType === 'road' && !!(danji?.lat && danji?.long) && (
          <MapStreet defaultMapSize="100%" isFullScreen bindPanorama={bindPanorama} />
        )}

        {(mapType === 'map' || mapType === 'roadlayer') && (
          <NaverMapV1
            id="negocio-danji-map"
            onCreate={onCreate}
            center={center}
            mapHeight={mapHeight}
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

        {(mobileDanjiInteraction.isShowMap || mobileDanjiInteraction.isShowRoad) && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              transform: 'translate3d(0, 0, 0)',
              zIndex: 10000,
            }}
          >
            <MapControls.Group>
              {mobileDanjiInteraction.isShowMap && (
                <MapButton onClick={() => makeGeneralMap()} selected={mapType === 'map'} />
              )}
              {mobileDanjiInteraction.isShowRoad && (
                <StreetViewButton
                  onClick={() => makeRoadLayer()}
                  selected={mapType === 'road' || mapType === 'roadlayer'}
                />
              )}
            </MapControls.Group>
          </div>
        )}
      </div>
    </div>
  );
}
