import { ReactNode, useCallback, useState } from 'react';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import { AnimatePresence, motion } from 'framer-motion';

import OutsideClick from '@/components/atoms/OutsideClick';

import Layout from '@/components/domains/map';

import useMapLayout from '@/hooks/useMapLayout';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import { Map } from '@/lib/navermap';

import { searchAddress } from '@/lib/kakao/search_address';

import PcGlobalStyles from '@/styles/PcGlobalStyles';

import useAPI_GetUserInfo from '@/apis/user/getUserInfo';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import Markers from './Markers';

import useMapLayoutHandler from './hooks/useMapLayoutHandler';

const MapStreetView = dynamic(() => import('./MapStreetView'), {
  ssr: false,
});

const StreetViewPanorama = dynamic(() => import('./StreetViewPanorama'), {
  ssr: false,
});

const StreetViewMap = dynamic(() => import('./StreetViewMap'), {
  ssr: false,
});

const ImpossibleSuggestAreaPopup = dynamic(() => import('@/components/organisms/popups/ImpossibleSuggestAreaPopup'), {
  ssr: false,
});

const NeedMoreVerificationAddressPopup = dynamic(() => import('./popups/NeedMoreVerificationAddressPopup'), {
  ssr: false,
});

const VerificationAddressPopup = dynamic(() => import('./popups/VerificationAddressPopup'), { ssr: false });

interface Props {
  children?: ReactNode;
}

function MapWrapper({
  panelsVisible,
  onTogglePanelsVisibility,
}: {
  panelsVisible: boolean;
  onTogglePanelsVisibility: () => void;
}) {
  const {
    morphToCurrentLocation,
    zoomIn,
    zoomOut,
    handleChangeMapType,
    handleChangeMapLayer,
    handleChangeSchoolType,
    handleMapSearch,
    handleChangeFilter,
    handleChangeMapToggleValue,
    handleChangePriceType,
    handleCloseStreetView,
    clearRecentSearches,
    removeRecentSearch,
    myMarker,
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
    priceType,
    streetViewEvent,
    recentSearches,
    isGeoLoading,
    selectedMarker,
    selectedMouseOverMarker,
    danjiSummary,
    interactionSelectedDanjiSummary,
    interactionStateDanjiSummary,
    selectedMouseOverDanjiSummary,
    removeMyMarker,
    searchResultMarker,
    interactionSelectedMarker,
    aroundMarkers,
    bubjungdongCode,
    ...props
  } = useMapLayout();

  const { data: userData } = useAPI_GetUserInfo();

  const router = useRouter();

  const { depth, popLast, replace, asPath } = useCustomRouter(0);

  const [openImpossibleSuggestAreaPopup, setOpenImpossibleSuggestAreaPopup] = useState(false);

  const [openVerificationAddressPopup, setOpenVerificationAddressPopup] = useState(false);

  const [openNeedMoreVerificationAddressPopup, setOpenNeedMoreVerificationAddressPopup] = useState(false);

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const handleSuggestFormRouter = useCallback(
    (address?: string, bcode?: string) => {
      if (address && bcode) {
        router.push({
          pathname: `/${Routes.SuggestForm}`,
          query: { address: JSON.stringify([address]), bcode: JSON.stringify([bcode]), entry: Routes.Map },
        });
      } else {
        router.push({ pathname: `/${Routes.SuggestForm}`, query: { entry: Routes.Map } });
      }
    },
    [router],
  );

  const handleClickSuggestForm = useCallback(async () => {
    const response = await apiService.suggestEligibilityCheck({ bubjungdong_code: bubjungdongCode });

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
  }, [bubjungdongCode, centerAddress, handleSuggestFormRouter]);

  const handleClickMapListingList = useCallback(() => {
    replace(Routes.MapListingList);
  }, [replace]);

  const handleClickListingCreateAddress = useCallback(async () => {
    if (!userData) {
      openAuthPopup('needVerify');
      handleUpdateReturnUrl();
      return;
    }

    if (!userData.is_verified) {
      router.push(`/${Routes.VerifyCi}`);
      handleUpdateReturnUrl();
      return;
    }

    if (!userData?.has_address) {
      setOpenVerificationAddressPopup(true);
      return;
    }

    if (userData?.has_address) {
      const res = await apiService.listingEligibilityCheck({ id: null });

      if (res && !res?.is_eligible) {
        setOpenNeedMoreVerificationAddressPopup(true);
        return;
      }

      if (res && res?.is_eligible) {
        replace(Routes.ListingSelectAddress, {
          searchParams: {
            origin: asPath,
          },
        });
      }
    }
  }, [asPath, handleUpdateReturnUrl, openAuthPopup, replace, router, userData]);

  const handleClickAgentSite = useCallback(() => {
    window.open(process.env.NEXT_PUBLIC_NEGOCIO_AGENT_CLIENT_URL, '_blank');
  }, []);

  const handleCloseImpossibleSuggestAreaPopup = useCallback(() => setOpenImpossibleSuggestAreaPopup(false), []);

  const handleActionVerificationAddressPopup = useCallback(() => {
    setOpenVerificationAddressPopup(false);
    replace(Routes.MyAddress, { searchParams: { origin: asPath } });
  }, [asPath, replace]);

  const handleCancelVerificationAddressPopup = useCallback(
    () => setOpenVerificationAddressPopup(false),
    [setOpenVerificationAddressPopup],
  );

  const handleActionNeedMoreVerificationAddressPopup = useCallback(() => {
    setOpenNeedMoreVerificationAddressPopup(false);
    replace(Routes.MyAddress, { searchParams: { origin: asPath } });
  }, [asPath, replace]);

  const handleCancelNeedMoreVerificationAddressPopup = useCallback(
    () => setOpenNeedMoreVerificationAddressPopup(false),
    [],
  );

  return (
    <>
      <Layout.MapContainer
        isGeoLoading={isGeoLoading}
        recentSearches={recentSearches}
        mapLayer={mapLayer}
        myMarker={myMarker}
        mapType={mapType}
        schoolType={schoolType}
        priceType={priceType}
        filter={filter}
        priceSelectDisabled={filter.realestateTypeGroup === 'one,two'}
        centerAddress={centerAddress}
        mapToggleValue={mapToggleValue}
        listingCount={listingCount}
        showClosePanelButton={depth > 1}
        panelsVisible={panelsVisible}
        onClickCurrentLocation={morphToCurrentLocation}
        onClickZoomIn={zoomIn}
        onClickZoomOut={zoomOut}
        onChangeMapType={handleChangeMapType}
        onClickMapLayerCadastral={() => handleChangeMapLayer('cadastral')}
        onClickMapLayerStreet={() => handleChangeMapLayer('street')}
        onChangeSchoolType={handleChangeSchoolType}
        onMapSearchSubmit={handleMapSearch}
        onChangeFilter={handleChangeFilter}
        onChangeMapToggleValue={handleChangeMapToggleValue}
        onChangePriceType={handleChangePriceType}
        onClickClosePanel={popLast}
        onClickSuggestForm={handleClickSuggestForm}
        onClickMapListingList={handleClickMapListingList}
        onClickListingCreateAddress={handleClickListingCreateAddress}
        onClickAgentSite={handleClickAgentSite}
        onTogglepanelsVisibility={onTogglePanelsVisibility}
        onClickRemoveAllRecentSearches={clearRecentSearches}
        onClickRemoveRecentSearch={removeRecentSearch}
        removeMyMarker={removeMyMarker}
      >
        <Map {...props}>
          <Markers
            mapLevel={bounds?.mapLevel ?? 4}
            markers={markers}
            schoolMarkers={schoolMarkers}
            myMarker={myMarker}
            searchResultMarker={searchResultMarker}
            selectedMarker={selectedMarker}
            selectedMouseOverMarker={selectedMouseOverMarker}
            interactionSelectedMarker={interactionSelectedMarker}
            danjiSummary={danjiSummary}
            interactionSelectedDanjiSummary={interactionSelectedDanjiSummary}
            interactionStateDanjiSummary={interactionStateDanjiSummary}
            selectedMouseOverDanjiSummary={selectedMouseOverDanjiSummary}
            aroundMarkers={aroundMarkers}
            mapBuyOrRent={filter?.buyOrRents}
          />
        </Map>
      </Layout.MapContainer>
      <AnimatePresence>
        {streetViewEvent && (
          <Layout.Overlay tw="flex items-center justify-center">
            <OutsideClick onOutsideClick={handleCloseStreetView}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <div tw="w-[780px] max-h-[960px] h-[85vh] bg-white rounded-lg">
                  <MapStreetView
                    position={{ lat: streetViewEvent.latlng.lat(), lng: streetViewEvent.latlng.lng() }}
                    title={streetViewEvent.address}
                    onClickBackButton={handleCloseStreetView}
                  >
                    <StreetViewPanorama />
                    <StreetViewMap />
                  </MapStreetView>
                </div>
              </motion.div>
            </OutsideClick>
          </Layout.Overlay>
        )}
      </AnimatePresence>

      {openImpossibleSuggestAreaPopup && (
        <ImpossibleSuggestAreaPopup handleClosePopup={handleCloseImpossibleSuggestAreaPopup} />
      )}

      {openVerificationAddressPopup && (
        <VerificationAddressPopup
          handleCancel={handleCancelVerificationAddressPopup}
          handleConfirm={handleActionVerificationAddressPopup}
        />
      )}

      {openNeedMoreVerificationAddressPopup && (
        <NeedMoreVerificationAddressPopup
          handleCancel={handleCancelNeedMoreVerificationAddressPopup}
          handleConfirm={handleActionNeedMoreVerificationAddressPopup}
        />
      )}
    </>
  );
}

export default function MapLayout({ children }: Props) {
  const { unreadChatCount, tabIndex, panelsVisible, togglePanelsVisibility, handleClickLogo, handleChangeRoutes } =
    useMapLayoutHandler();

  // Map 과 useMapLayout 의 state 가 Panel 안에 그려지는 화면의 영향을 주지 않기위해서 분리된 컴포넌트로 사용한다.

  return (
    <>
      <PcGlobalStyles />
      <Layout
        unreadChatCount={unreadChatCount}
        tabIndex={tabIndex}
        onChangeTab={handleChangeRoutes}
        onClickLogo={handleClickLogo}
      >
        <Layout.Panels visible={panelsVisible}>{children}</Layout.Panels>
        <MapWrapper panelsVisible={panelsVisible} onTogglePanelsVisibility={togglePanelsVisibility} />
      </Layout>
    </>
  );
}
