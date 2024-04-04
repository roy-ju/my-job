/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';

import tw, { styled } from 'twin.macro';

import useMobileDanjiMap from '@/states/hooks/useMobileDanjiMap';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import { NaverMapV1 } from '@/lib/navermapV1';

import CustomOverlayV1 from '@/lib/navermap/components/CustomOverlayV1';

import MapEnlarge from './MapEnlargeButton';

import { MapTypeButton } from './MapTypeButton';

import useBasicInfoDanjiMapMobile from '../hooks/useBasicInfoDanjiMapMobile';

import { MapMarkerShadow } from '../../shared/widgets';

import { MapStreet } from '../../shared/MapStreet';

import MapMarkerSearch from '../../shared/MapMarkerSearch';

import { CommonDanjiDetailProps } from '../../types';

const DivContainer = styled.div``;

const RelativeDivContainer = styled.div`
  ${tw`relative w-full`}
`;

export default function Map({ danji }: CommonDanjiDetailProps) {
  const { mapType, makeRoadType, makePanoPosition } = useMobileDanjiMap();

  const danjiMapButtonStore = useMobileDanjiInteraction();

  const {
    streetViewLayer,
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
  } = useBasicInfoDanjiMapMobile({ danji });

  useEffect(() => {
    if (!map) return;

    const streetLayer = new naver.maps.StreetLayer();

    if (mapType === 'roadlayer') {
      streetLayer.setMap(map);
      updateStreeViewLayer(streetLayer);
    }

    if (mapType !== 'roadlayer') {
      streetViewLayer?.setMap(null);
    }

    naver.maps.Event.addListener(map, 'click', (e) => {
      const latlng = e.coord;

      if (streetLayer.getMap()) {
        makeRoadType();
        updateClickedCenter({ lat: latlng.y, lng: latlng.x });
        makePanoPosition(latlng.y, latlng.x);
      }
    });
  }, [mapType]);

  const handleEnlarge = useCallback(() => {
    danjiMapButtonStore.makeTrue();
  }, []);

  return (
    <DivContainer ref={containerRef}>
      <RelativeDivContainer
        style={{
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
            <MapTypeButton type={mapType} right="12px" bottom="12px" />
            {mapType === 'road' && <MapStreet containerId="panorama-small" bindPanorama={bindPanorama} />}
            {(mapType === 'map' || mapType === 'roadlayer') && (
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
                  <MapMarkerSearch />
                  <MapMarkerShadow />
                </CustomOverlayV1>
              </NaverMapV1>
            )}
          </>
        )}
      </RelativeDivContainer>
    </DivContainer>
  );
}
