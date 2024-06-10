import { useCallback, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import { AnimatePresence, motion } from 'framer-motion';

import OutsideClick from '@/components/atoms/OutsideClick';

import Layout from '@/components/domains/map';

import useMobileMapLayout from '@/hooks/useMobileMapLayout';

import { apiService } from '@/services';

import { Map } from '@/lib/navermap';

import { searchAddress } from '@/lib/kakao/search_address';

import MobileGlobalStyles from '@/styles/MobileGlobalStyles';

import Routes from '@/router/routes';

import ImpossibleSuggestAreaPopup from '@/components/organisms/popups/ImpossibleSuggestAreaPopup';

import Markers from './Markers';

import MapLayoutContainer from './MapLayoutContainer';

const DanjiSummaryInMobileBottomSheet = dynamic(
  () => import('@/components/organisms/danji/DanjiSummaryInMobileBottomSheet'),
  { ssr: false },
);

const LocationPermission = dynamic(() => import('./popups/LocationPermission'), { ssr: false });

const LocationPermissionNative = dynamic(() => import('./popups/LocationPermissionNative'), { ssr: false });

const MapStreetViewMobile = dynamic(() => import('./MapStreetViewMobile'), {
  ssr: false,
});

const StreetViewPanorama = dynamic(() => import('./StreetViewPanorama'), {
  ssr: false,
});

export default function MapLayoutMobile() {
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
    popup,
    setPopup,
    removeMyMarker,
    ...props
  } = useMobileMapLayout();

  const router = useRouter();

  const [openImpossibleSuggestAreaPopup, setOpenImpossibleSuggestAreaPopup] = useState(false);

  const handleSuggestFormRouter = useCallback(
    (address?: string, bcode?: string) => {
      if (address && bcode) {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
          query: {
            address: JSON.stringify([address]),
            bcode: JSON.stringify([bcode]),
            entry: Routes.Map,
          },
        });
      } else {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
          query: {
            entry: Routes.Map,
          },
        });
      }
    },
    [router],
  );

  const handleClickSuggestRegional = useCallback(async () => {
    if (!code) return;

    const response = await apiService.suggestEligibilityCheck({ bubjungdong_code: code });

    if (response && !response.eligible) {
      setOpenImpossibleSuggestAreaPopup(true);
      return;
    }

    if (centerAddress.join('') !== '') {
      searchAddress(centerAddress.join(' '))
        .then((data) => {
          const bCode = data?.documents?.[0].address?.b_code;
          if (bCode) {
            handleSuggestFormRouter(centerAddress.join(' '), bCode);
          } else {
            handleSuggestFormRouter();
          }
        })
        .catch(() => {
          handleSuggestFormRouter();
        });
    } else {
      handleSuggestFormRouter();
    }
  }, [code, centerAddress, handleSuggestFormRouter]);

  const [touchEvent, setTouchEvent] = useState<'none' | 'touch' | 'scroll'>('none');
  const [render, setRender] = useState(false);

  const handleTouchEvent = useCallback((val: 'none' | 'touch' | 'scroll') => {
    setTouchEvent(val);
  }, []);

  useEffect(() => {
    if (selectedDanjiSummary) {
      setRender(true);
    }
  }, [selectedDanjiSummary]);

  return (
    <>
      <MobileGlobalStyles />
      <MapLayoutContainer
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
        removeMyMarker={removeMyMarker}
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

        {render && (
          <DanjiSummaryInMobileBottomSheet
            selectedDanjiSummary={selectedDanjiSummary}
            filter={filter}
            touchEvent={touchEvent}
            onTouchEvent={handleTouchEvent}
            mapBuyOrRents={filter.buyOrRents}
          />
        )}

        <AnimatePresence>
          {streetViewEvent && (
            <Layout.Overlay tw="flex items-center justify-center w-full h-[100vh]">
              <div tw="w-[100%]">
                <OutsideClick onOutsideClick={handleCloseStreetView}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <div tw="min-w-[23.475rem] h-[100vh] max-h-[100vh] bg-white">
                      <MapStreetViewMobile
                        position={{ lat: streetViewEvent.latlng.lat(), lng: streetViewEvent.latlng.lng() }}
                        title={streetViewEvent.address}
                        onClickBackButton={handleCloseStreetView}
                      >
                        <StreetViewPanorama />
                      </MapStreetViewMobile>
                    </div>
                  </motion.div>
                </OutsideClick>
              </div>
            </Layout.Overlay>
          )}
        </AnimatePresence>
      </MapLayoutContainer>

      {popup === 'locationPermission' && <LocationPermission handleCancel={() => setPopup('none')} />}

      {popup === 'locationPermissionNative' && (
        <LocationPermissionNative
          handleCancel={() => setPopup('none')}
          handleConfirm={() => {
            window.Android?.goToAppPermissionSettings?.();
            window.webkit?.messageHandlers?.goToAppPermissionSettings?.postMessage?.('goToAppPermissionSettings');
            setPopup('none');
          }}
        />
      )}

      {openImpossibleSuggestAreaPopup && (
        <ImpossibleSuggestAreaPopup handleClosePopup={() => setOpenImpossibleSuggestAreaPopup(false)} />
      )}
    </>
  );
}
