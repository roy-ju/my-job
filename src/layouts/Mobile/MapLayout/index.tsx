import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AnimatePresence, motion } from 'framer-motion';

import OutsideClick from '@/components/atoms/OutsideClick';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { MobDanjiSummary } from '@/components/organisms';

import { MapLayout as Layout, MobLayoutMapContainer, MobMapStreetView } from '@/components/templates';

import useMobileMapLayout from '@/hooks/useMobileMapLayout';

import { apiService } from '@/services';

import { Map } from '@/lib/navermap';

import { searchAddress } from '@/lib/kakao/search_address';

import MobileGlobalStyles from '@/styles/MobileGlobalStyles';

import Routes from '@/router/routes';

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
  } = useMobileMapLayout();

  const router = useRouter();

  const [openPopup, setOpenPopup] = useState(false);

  const handleSuggestFormRouter = useCallback(
    (address?: string, bcode?: string) => {
      if (address && bcode) {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
          query: {
            address,
            bcode,
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
      setOpenPopup(true);
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

        {render && (
          <MobDanjiSummary
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
              <Popup.SubTitle>해당 지역은 서비스 준비중입니다.</Popup.SubTitle>
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
