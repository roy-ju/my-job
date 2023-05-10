import OutsideClick from '@/components/atoms/OutsideClick';
import { MapLayout as Layout, MapStreetView } from '@/components/templates';
import { Map } from '@/lib/navermap';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import PcGlobalStyles from '@/styles/PcGlobalStyles';
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
    selectedDanjiSummary,
    selectedSchoolID,
    priceType,
    streetViewEvent,
    recentSearches,
    ...props
  } = useMapLayout();

  const { depth, popLast, replace } = useRouter(0);

  const handleClickSuggestRegional = useCallback(() => {
    replace(Routes.SuggestRegionalForm);
  }, [replace]);

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
        recentSearches={recentSearches}
        mapLayer={mapLayer}
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
      >
        <Map {...props}>
          <Markers
            mapLevel={bounds?.mapLevel ?? 4}
            markers={markers}
            schoolMarkers={schoolMarkers}
            selectedDanjiSummary={selectedDanjiSummary}
            selectedSchoolID={selectedSchoolID}
            myMarker={myMarker}
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
    </>
  );
}

export default function MapLayout({ children }: Props) {
  const router = useRouter(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [panelsVisible, setPanelsVisible] = useState(true);

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
    }
  }, [router]);

  const togglePanelsVisibility = useCallback(() => setPanelsVisible((prev) => !prev), []);

  return (
    <>
      <PcGlobalStyles />
      <Layout tabIndex={tabIndex} onChangeTab={handleChangeTabIndex}>
        <Layout.Panels visible={panelsVisible}>{children}</Layout.Panels>
        {/* Map 과 useMapLayout 의 state 가 Panel 안에 그려지는 화면의 영향을 주지 않기위해서
      분리된 컴포넌트로 사용한다. */}
        <MapWrapper panelsVisible={panelsVisible} onTogglePanelsVisibility={togglePanelsVisibility} />
      </Layout>
    </>
  );
}
