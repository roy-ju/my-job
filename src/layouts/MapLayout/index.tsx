import { ReactNode, useCallback, useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { useRouter } from 'next/router';

import OutsideClick from '@/components/atoms/OutsideClick';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { MapLayout as Layout, MapStreetView } from '@/components/templates';

import useMap from '@/states/map';

import useSyncronizer from '@/states/syncronizer';

import listingEligibilityCheck from '@/apis/listing/listingEligibilityCheck';

import { suggestEligibilityCheck } from '@/apis/suggest/suggestEligibilityCheck';

import useMapLayout from '@/hooks/useMapLayout';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import { Map } from '@/lib/navermap';

import { searchAddress } from '@/lib/kakao/search_address';

import PcGlobalStyles from '@/styles/PcGlobalStyles';

import useAPI_GetUserInfo from '@/apis/user/getUserInfo';

import Routes from '@/router/routes';

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
    popup,
    setPopup,
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

  const { depth, popLast, replace, asPath } = useCustomRouter(0);

  const [openPopup, setOpenPopup] = useState(false);

  const [openVerificationAddressPopup, setOpenVerificationAddressPopup] = useState(false);

  const [openNeedMoreVerificationAddressPopup, setOpenNeedMoreVerificationAddressPopup] = useState(false);

  const handleSuggestFormRouter = useCallback(
    (address?: string, bcode?: string) => {
      if (address && bcode) {
        replace(Routes.SuggestForm, {
          searchParams: { entry: 'map', address, bcode },
        });
      } else {
        replace(Routes.SuggestForm, { searchParams: { entry: 'map' } });
      }
    },
    [replace],
  );

  const handleClickSuggestForm = useCallback(async () => {
    const response = await suggestEligibilityCheck(bubjungdongCode);

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
  }, [bubjungdongCode, centerAddress, handleSuggestFormRouter]);

  const handleClickMapListingList = useCallback(() => {
    replace(Routes.MapListingList);
  }, [replace]);

  const handleClickListingCreateAddress = useCallback(async () => {
    if (!userData) {
      replace(Routes.Login, {
        persistParams: true,
        searchParams: { redirect: `${asPath}` },
      });

      return;
    }

    if (!userData.is_verified) {
      replace(Routes.VerifyCi, {
        persistParams: true,
        searchParams: { redirect: `${asPath}` },
      });
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
  }, [asPath, replace, userData]);

  const handleClickAgentSite = useCallback(() => {
    window.open(process.env.NEXT_PUBLIC_NEGOCIO_AGENT_CLIENT_URL, '_blank');
  }, []);

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

      {popup === 'locationPermission' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>간편로그인 방법 변경</Popup.Title>
              <Popup.Body>
                이미 다른 네고시오 계정에서 사용되고 있습니다.
                <br />
                해당계정을 삭제하고 간편로그인 방법 변경을 계속 진행하시겠습니까?
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setPopup('none')}>확인</Popup.ActionButton>
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
              <Popup.CancelButton onClick={() => setOpenVerificationAddressPopup(false)}>취소</Popup.CancelButton>
              <Popup.ActionButton
                onClick={() => {
                  setOpenVerificationAddressPopup(false);
                  replace(Routes.MyAddress, { searchParams: { origin: asPath } });
                }}
              >
                인증하기
              </Popup.ActionButton>
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
              <Popup.CancelButton onClick={() => setOpenNeedMoreVerificationAddressPopup(false)}>
                취소
              </Popup.CancelButton>
              <Popup.ActionButton
                onClick={() => {
                  setOpenNeedMoreVerificationAddressPopup(false);
                  replace(Routes.MyAddress, { searchParams: { origin: asPath } });
                }}
              >
                인증하기
              </Popup.ActionButton>
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
        case 1: // 지도
          map.naverMap?.setZoom(16, true);
          router.push(`/${Routes.Map}`);
          break;
        case 2: // 나의거래
          router.push(`/${Routes.MyFavoriteList}`);
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
    } else if (router.pathname === Routes.Map) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.MyFavoriteList) {
      handleChangeTabIndex(2);
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
