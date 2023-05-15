import OutsideClick from '@/components/atoms/OutsideClick';
import { Map } from '@/lib/navermap';
import { MapLayout as Layout, MobLayoutMapContainer, MobMapStreetView } from '@/components/templates';
import { AnimatePresence, motion } from 'framer-motion';
import MobileGlobalStyles from '@/styles/MobileGlobalStyles';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import useMapLayout from './useMapLayout';
import Markers from './Markers';

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
    handleClickMapListingList,
    code,
    myMarker,
    isGeoLoading,
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

  const router = useRouter();

  const handleClickSuggestRegional = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}`);
  }, [router]);

  return (
    <>
      <MobileGlobalStyles />
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
        myMarker={myMarker}
        isGeoLoading={isGeoLoading}
        selectedDanjiSummary={selectedDanjiSummary}
        selctedListingSummary={selctedListingSummary}
        priceSelectDisabled={filter.realestateTypeGroup === 'one,two'}
        onClickCurrentLocation={morphToCurrentLocation}
        onChangeMapType={handleChangeMapType}
        onClickMapLayerCadastral={() => handleChangeMapLayer('cadastral')}
        onClickMapLayerStreet={() => handleChangeMapLayer('street')}
        onChangeSchoolType={handleChangeSchoolType}
        onMapSearchSubmit={handleMapSearch}
        onChangeFilter={handleChangeFilter}
        onChangeMapToggleValue={handleChangeMapToggleValue}
        onChangePriceType={handleChangePriceType}
        onClickMapListingList={handleClickMapListingList}
        onClickSuggestReginoal={handleClickSuggestRegional}
      >
        <Map {...props}>
          <Markers
            mapLevel={bounds?.mapLevel ?? 4}
            markers={markers}
            myMarker={myMarker}
            schoolMarkers={schoolMarkers}
            selectedDanjiSummary={selectedDanjiSummary}
            selectedSchoolID={selectedSchoolID}
          />
        </Map>
        <AnimatePresence>
          {streetViewEvent && (
            <Layout.Overlay tw="flex items-center justify-center w-full h-[100vh]">
              <div tw="w-[100%] max-w-mobile">
                <OutsideClick onOutsideClick={handleCloseStreetView}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <div tw="min-w-[23.475rem] h-[100vh] max-h-[100vh] max-w-mobile bg-white">
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
