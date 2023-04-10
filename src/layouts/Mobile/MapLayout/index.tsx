/* eslint-disable consistent-return */
import OutsideClick from '@/components/atoms/OutsideClick';

import { Map } from '@/lib/navermap';
import { MapLayout as Layout, MobGuideOverlay, MobMapStreetView } from '@/components/templates';
import { AnimatePresence, motion } from 'framer-motion';
import MobLayoutMapContainer from '@/components/templates/MobMapLayout';
import MobileGlobalStyles from '@/styles/MobileGlobalStyles';

import { useEffect, useState } from 'react';

import Markers from './Markers';
import useMapLayout from './useMapLayout';

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
    code,
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
    selctedListingSummary,
    selectedSchoolID,
    priceType,
    streetViewEvent,
    ...props
  } = useMapLayout();

  const [isRenderGuideOverlay, setIsRenderGuideOverlay] = useState(false);

  const disappearGuideOverlay = () => {
    setIsRenderGuideOverlay(false);
  };

  useEffect(() => {
    if (localStorage.getItem('neogico-mob-map-initial') === 'true') {
      setIsRenderGuideOverlay(false);
      return;
    }
    if (!localStorage.getItem('neogico-mob-map-initial')) {
      localStorage.setItem('neogico-mob-map-initial', 'true');
      setIsRenderGuideOverlay(true);
    }
    return () => setIsRenderGuideOverlay(false);
  }, []);

  useEffect(() => {
    if (isRenderGuideOverlay) {
      const timeout = setTimeout(() => setIsRenderGuideOverlay(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [isRenderGuideOverlay]);

  return (
    <>
      <MobileGlobalStyles />
      {isRenderGuideOverlay && <MobGuideOverlay disappearGuideOverlay={disappearGuideOverlay} />}
      <MobLayoutMapContainer
        code={code}
        mapLayer={mapLayer}
        mapType={mapType}
        schoolType={schoolType}
        priceType={priceType}
        filter={filter}
        centerAddress={centerAddress}
        mapToggleValue={mapToggleValue}
        listingCount={listingCount}
        currentLocation={currentLocation}
        selectedDanjiSummary={selectedDanjiSummary}
        selctedListingSummary={selctedListingSummary}
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
