import OutsideClick from '@/components/atoms/OutsideClick';

import { Map } from '@/lib/navermap';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { MapLayout as Layout, MobMapStreetView } from '@/components/templates';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import MobLayoutMapContainer from '@/components/templates/MobMapLayout';
import { MapFilter } from '@/components/organisms';
import useMapLayout from './useMapLayout';
import Markers from './Markers';

interface Props {
  children?: ReactNode;
}

function MapWrapper() {
  const {
    morphToCurrentLocation,
    handleChangeMapType,
    handleChangeMapLayer,
    handleChangeSchoolType,
    handleMapSearch,
    handleChangeFilter,
    handleChangeMapToggleValue,
    handleChangePriceType,
    handleCloseStreetView,
    currentLocation,
    mapType,
    mapLayer,
    schoolType,
    centerAddress,
    bounds,
    filter,
    markers,
    schoolMarkers,
    mapToggleValue,
    listingCount,
    selectedDanjiSummary,
    selectedSchoolID,
    priceType,
    streetViewEvent,
    ...props
  } = useMapLayout();

  return (
    <>
      <MobLayoutMapContainer
        mapLayer={mapLayer}
        mapType={mapType}
        schoolType={schoolType}
        priceType={priceType}
        filter={filter}
        centerAddress={centerAddress}
        mapToggleValue={mapToggleValue}
        listingCount={listingCount}
        currentLocation={currentLocation}
        onClickCurrentLocation={morphToCurrentLocation}
        onChangeMapType={handleChangeMapType}
        onClickMapLayerCadastral={() => handleChangeMapLayer('cadastral')}
        onClickMapLayerStreet={() => handleChangeMapLayer('street')}
        onChangeSchoolType={handleChangeSchoolType}
        onMapSearchSubmit={handleMapSearch}
        onChangeFilter={handleChangeFilter}
        onChangeMapToggleValue={handleChangeMapToggleValue}
        onChangePriceType={handleChangePriceType}
      >
        <Map {...props}>
          <Markers
            mapLevel={bounds?.mapLevel ?? 4}
            markers={markers}
            schoolMarkers={schoolMarkers}
            selectedDanjiSummary={selectedDanjiSummary}
            selectedSchoolID={selectedSchoolID}
            currentLocation={currentLocation}
          />
        </Map>
        <AnimatePresence>
          {streetViewEvent && (
            <Layout.Overlay tw="flex items-center justify-center w-full">
              <div tw="w-[100%] max-w-mobile">
                <OutsideClick onOutsideClick={handleCloseStreetView}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <div tw="min-w-[23.475rem] max-w-mobile max-h-[100vh] h-[100vh] bg-white">
                      <MobMapStreetView
                        position={{ lat: streetViewEvent.latlng.lat(), lng: streetViewEvent.latlng.lng() }}
                        title={streetViewEvent.address}
                        onClickBackButton={handleCloseStreetView}
                      >
                        <MobMapStreetView.Panorama />
                      </MobMapStreetView>
                    </div>
                  </motion.div>
                </OutsideClick>
              </div>
            </Layout.Overlay>
          )}
        </AnimatePresence>
      </MobLayoutMapContainer>
    </>
  );
}

export default function MobMapLayout() {
  return <MapWrapper />;
}
