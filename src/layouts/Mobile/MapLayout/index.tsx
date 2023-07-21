import OutsideClick from '@/components/atoms/OutsideClick';
import { Map } from '@/lib/navermap';
import { MapLayout as Layout, MobLayoutMapContainer, MobMapStreetView } from '@/components/templates';
import { AnimatePresence, motion } from 'framer-motion';
import MobileGlobalStyles from '@/styles/MobileGlobalStyles';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { danjiSuggestEligibilityCheck } from '@/apis/danji/danjiRecommendation';
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
    popup,
    setPopup,
    removeMyMarker,
    ...props
  } = useMapLayout();

  const router = useRouter();

  const [openPopup, setOpenPopup] = useState(false);

  const handleClickSuggestRegional = useCallback(async () => {
    if (!code) return;

    const response = await danjiSuggestEligibilityCheck(code);

    if (response && !response.eligible) {
      setOpenPopup(true);
      return;
    }

    if (centerAddress.join('') !== '') {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}`,
        query: {
          address: centerAddress.join(' '),
        },
      });
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}`);
    }
  }, [router, centerAddress, code]);

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
      {popup === 'locationPermission' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-12">
              <Popup.Title>위치 접근 권한을 허용해 주세요.</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setPopup('none')}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {popup === 'locationPermissionNative' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-12">
              <Popup.Title>위치 접근 권한을 허용해 주세요.</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setPopup('none')}>취소</Popup.CancelButton>
              <Popup.ActionButton
                onClick={() => {
                  window.Android?.goToAppPermissionSettings?.();
                  window.webkit?.messageHandlers?.goToAppPermissionSettings?.postMessage?.('goToAppPermissionSettings');
                  setPopup('none');
                }}
              >
                허용하기
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {openPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SubTitle>
                해당 지역은 서비스 준비중입니다.
                <br />
                경기, 서울, 인천 지역에서 시도해 주세요.
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setOpenPopup(false)}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}

export default function MobMapLayout() {
  return <MapWrapper />;
}