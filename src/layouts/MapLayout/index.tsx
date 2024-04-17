import { ReactNode, useCallback, useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { useRouter } from 'next/router';

import OutsideClick from '@/components/atoms/OutsideClick';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { MapLayout as Layout, MapStreetView } from '@/components/templates';

import useMap from '@/states/hooks/useMap';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import listingEligibilityCheck from '@/apis/listing/listingEligibilityCheck';

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

import ImpossibleSuggestAreaPopup from '@/components/organisms/popups/ImpossibleSuggestAreaPopup';

import Markers from './Markers';

import usePanelVisible from './hooks/usePanelVisible';

import useTab from './hooks/useTab';

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
      const res = await listingEligibilityCheck({ danji_id: null });

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
                    <MapStreetView.Panorama />
                    <MapStreetView.Map />
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
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SubTitle>
                매물등록을 위해서는 집주인 인증이 필요합니다.
                <br />
                우리집을 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handleCancelVerificationAddressPopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleActionVerificationAddressPopup}>인증하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {openNeedMoreVerificationAddressPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SubTitle>
                추가로 매물등록이 가능한 우리집 정보가 없습니다.
                <br />
                우리집을 추가 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handleCancelNeedMoreVerificationAddressPopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleActionNeedMoreVerificationAddressPopup}>인증하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}

export default function MapLayout({ children }: Props) {
  const map = useMap();

  const router = useRouter();

  const { panelsVisible, handlePanelsVisible, togglePanelsVisibility } = usePanelVisible();

  const { tabIndex, handleChangeTabIndex } = useTab();

  const { unreadChatCount } = useSyncronizer();

  const handleClickLogo = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleChangeRoutes = useCallback(
    (index: number) => {
      switch (index) {
        case 0: // 홈
          router.push('/');
          break;
        case 1: // 거래도우미
          router.push(`/${Routes.SubHome}`);
          break;
        case 2: // 지도
          map.naverMap?.setZoom(16, true);
          router.push(`/${Routes.Map}`);
          break;
        case 3: // 문의목록
          router.push(`/${Routes.ChatRoomList}`);
          break;
        case 4: // 마이페이지
          router.push(`/${Routes.My}`);
          break;
        case 5: // 개발자설정
          router.replace(`/${Routes.Developer}`);
          break;
        default:
          break;
      }
      handleChangeTabIndex(index);
      handlePanelsVisible(true);
    },
    [handleChangeTabIndex, handlePanelsVisible, map?.naverMap, router],
  );

  useEffect(() => {
    handlePanelsVisible(true);

    if (router.pathname === '/') {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.SuggestForm) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.SuggestDetail) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.SuggestGuide) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.SuggestFormUpdate) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.LawQna) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.LawQnaSearch) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.LawQnaDetail) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.LawQnaCreate) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.LawQnaUpdate) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.Map) {
      handleChangeTabIndex(2);
    } else if (router.query.depth1 === Routes.SubHome) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.TradeProcess) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.SpecialTerms) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.CommonSense) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.Dictionary) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.DictionaryDetail) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.ListingCheckList) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.RealestateDocumentSearchAddress) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.RealestateDocumentAddressDetail) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.RealestateDocumentAddressVerifying) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.RealestateDocumentAddressVerifyResult) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.RealestateDocumentList) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.RealestateDocumentDetail) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.ChatRoomList) {
      handleChangeTabIndex(3);
    } else if (router.query.depth1 === Routes.My) {
      handleChangeTabIndex(4);
    } else if (router.query.depth1 === Routes.Developer) {
      handleChangeTabIndex(5);
    } else {
      handleChangeTabIndex(0);
    }
  }, [handleChangeTabIndex, handlePanelsVisible, router]);

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
