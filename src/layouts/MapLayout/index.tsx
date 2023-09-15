import OutsideClick from '@/components/atoms/OutsideClick';
import { MapLayout as Layout, MapStreetView } from '@/components/templates';
import { Map } from '@/lib/navermap';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import PcGlobalStyles from '@/styles/PcGlobalStyles';
import { OverlayPresenter, Popup } from '@/components/molecules';
import useSyncronizer from '@/states/syncronizer';
import { danjiSuggestEligibilityCheck } from '@/apis/danji/danjiRecommendation';
import useMapLayout from './useMapLayout';
import Markers from './Markers';

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
    selectedMouseOverDanjiSummary,
    removeMyMarker,
    searchResultMarker,
    interactionSelectedMarker,
    aroundMarkers,
    bubjungdongCode,
    ...props
  } = useMapLayout();

  const { depth, popLast, replace } = useRouter(0);

  const [openPopup, setOpenPopup] = useState(false);

  const handleClickSuggestRegional = useCallback(async () => {
    const response = await danjiSuggestEligibilityCheck(bubjungdongCode);

    if (response && !response.eligible) {
      setOpenPopup(true);
      return;
    }

    if (centerAddress.join('') !== '') {
      replace(Routes.SuggestRegionalForm, {
        searchParams: {
          address: centerAddress.join(' '),
        },
      });
    } else {
      replace(Routes.SuggestRegionalForm);
    }
  }, [centerAddress, replace, bubjungdongCode]);

  const handleClickMapListingList = useCallback(() => {
    replace(Routes.MapListingList);
  }, [replace]);

  const handleClickListingCreateAddress = useCallback(() => {
    replace(Routes.ListingCreateAddress);
  }, [replace]);

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
        onClickSuggestReginoal={handleClickSuggestRegional}
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
            selectedMouseOverDanjiSummary={selectedMouseOverDanjiSummary}
            aroundMarkers={aroundMarkers}
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

export default function MapLayout({ children }: Props) {
  const router = useRouter(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [panelsVisible, setPanelsVisible] = useState(true);

  const handleClickLogo = useCallback(() => {
    router.popAll();
  }, [router]);

  const handleChangeTabIndex = useCallback(
    (index: number) => {
      switch (index) {
        case 0: // 홈
          router.popAll();
          break;
        case 1: // 지도
          router.replace(Routes.Map);
          break;
        case 2: // 나의거래
          router.replace(Routes.MyFavoriteList);
          break;
        case 3: // 문의목록
          router.replace(Routes.ChatRoomList);
          break;
        case 4: // 마이페이지
          router.replace(Routes.My);
          break;
        case 5: // 개발자설정
          router.replace(Routes.Developer);
          break;
        default:
          break;
      }
      setTabIndex(index);
      setPanelsVisible(true);
    },
    [router],
  );

  useEffect(() => {
    setPanelsVisible(true);
    if (router.pathname === '/') {
      setTabIndex(0);
    } else if (router.query.depth1 === 'lawQna') {
      setTabIndex(0);
    } else if (router.query.depth1 === 'lawQnaSearch') {
      setTabIndex(0);
    } else if (router.query.depth1 === 'lawQnaDetail') {
      setTabIndex(0);
    } else if (router.query.depth1 === 'lawQnaCreate') {
      setTabIndex(0);
    } else if (router.query.depth1 === 'lawQnaUpdate') {
      setTabIndex(0);
    } else if (router.pathname === '/map') {
      setTabIndex(1);
    } else if (router.query.depth1 === 'myFavoriteList') {
      setTabIndex(2);
    } else if (router.query.depth1 === 'chatRoomList') {
      setTabIndex(3);
    } else if (router.query.depth1 === 'my') {
      setTabIndex(4);
    } else if (router.query.depth1 === 'developer') {
      setTabIndex(5);
    } else {
      setTabIndex(1);
    }
  }, [router]);

  const togglePanelsVisibility = useCallback(() => setPanelsVisible((prev) => !prev), []);

  const { unreadChatCount } = useSyncronizer();

  return (
    <>
      <PcGlobalStyles />
      <Layout
        unreadChatCount={unreadChatCount}
        tabIndex={tabIndex}
        onChangeTab={handleChangeTabIndex}
        onClickLogo={handleClickLogo}
      >
        <Layout.Panels visible={panelsVisible}>{children}</Layout.Panels>
        {/* Map 과 useMapLayout 의 state 가 Panel 안에 그려지는 화면의 영향을 주지 않기위해서
      분리된 컴포넌트로 사용한다. */}
        <MapWrapper panelsVisible={panelsVisible} onTogglePanelsVisibility={togglePanelsVisibility} />
      </Layout>
    </>
  );
}
