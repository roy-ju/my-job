import { useEffect, useCallback } from 'react';

import Container from '@/components/atoms/Container';

import MapControls from '@/components/domains/map/MapControls';

import useMobileDanjiMap from '@/states/hooks/useMobileDanjiMap';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import { NaverMapV1 } from '@/lib/navermapV1';

import CustomOverlayV1 from '@/lib/navermap/components/CustomOverlayV1';

import useFullScreenMapMobile from './hooks/useFullScreenMapMobile';

import Header from './widget/Header';

import {
  FullScreenMapFlexContents,
  MapButton,
  MapControlsWrraper,
  StreetViewButton,
} from './widget/FullScreenMapWidget';

import { MapStreet } from '../shared/MapStreet';

import { MapMarkerShadow } from '../shared/widgets';

import MapMarkerSearch from '../shared/MapMarkerSearch';

import { CommonDanjiDetailProps } from '../types';

interface FullScreenMapProps extends CommonDanjiDetailProps {
  type: string;
}

export default function FullScreenMap({ type, danji }: FullScreenMapProps) {
  const { makeGeneralMap, panoCenter, makePanoInitialize, makeRoadLayer } = useMobileDanjiMap();

  const mobileDanjiInteraction = useMobileDanjiInteraction();

  const { mapType, mapHeight, center, minZoom, maxZoom, onCreate, bindPanorama, updateMapType, updateClickedCenter } =
    useFullScreenMapMobile({ danji });

  useEffect(() => {
    updateMapType(type);
  }, [type, updateMapType]);

  useEffect(() => {
    if (panoCenter) {
      updateClickedCenter({ lat: +panoCenter.lat, lng: +panoCenter.lng });
    }
  }, [danji, panoCenter, updateClickedCenter]);

  useEffect(
    () => () => {
      makeGeneralMap();
      makePanoInitialize();
      mobileDanjiInteraction.makeShowMapButton();
      mobileDanjiInteraction.makeShowRoadButton();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleCloseMap = useCallback(() => {
    mobileDanjiInteraction.makeFalse();
  }, [mobileDanjiInteraction]);

  const handleMakeDetaultMap = useCallback(() => {
    makeGeneralMap();
  }, [makeGeneralMap]);

  const handleMakeLoadMap = useCallback(() => {
    makeRoadLayer();
  }, [makeRoadLayer]);

  return (
    <Container>
      <Header name={danji.name} handleClick={handleCloseMap} />
      <FullScreenMapFlexContents>
        {mapType === 'road' && !!(danji?.lat && danji?.long) && (
          <MapStreet defaultMapSize="100%" bindPanorama={bindPanorama} />
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
              <MapMarkerSearch />
              <MapMarkerShadow />
            </CustomOverlayV1>
          </NaverMapV1>
        )}

        {(mobileDanjiInteraction.isShowMap || mobileDanjiInteraction.isShowRoad) && (
          <MapControlsWrraper>
            <MapControls.Group>
              {mobileDanjiInteraction.isShowMap && (
                <MapButton onClick={handleMakeDetaultMap} selected={mapType === 'map'} />
              )}

              {mobileDanjiInteraction.isShowRoad && (
                <StreetViewButton
                  onClick={handleMakeLoadMap}
                  selected={mapType === 'road' || mapType === 'roadlayer'}
                />
              )}
            </MapControls.Group>
          </MapControlsWrraper>
        )}
      </FullScreenMapFlexContents>
    </Container>
  );
}
