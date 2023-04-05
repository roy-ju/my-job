import OutsideClick from '@/components/atoms/OutsideClick';

import { Map } from '@/lib/navermap';
import { MapLayout as Layout, MobMapStreetView } from '@/components/templates';
import { AnimatePresence, motion } from 'framer-motion';
import MobLayoutMapContainer from '@/components/templates/MobMapLayout';
import MobileGlobalStyles from '@/styles/MobileGlobalStyles';
import { Chip, Separator } from '@/components/atoms';
import { describeRealestateType, RealestateType } from '@/constants/enums';
import CheveronDown from '@/assets/icons/chevron_down.svg';
import { formatNumberInKorean } from '@/utils';
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
    selectedSchoolID,
    priceType,
    streetViewEvent,

    ...props
  } = useMapLayout();

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
        currentLocation={currentLocation}
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

      {selectedDanjiSummary && (
        <div tw="w-[100%] max-w-mobile [border-bottom-width: 1px] border-b-gray-1100 absolute rounded-t-lg px-4 py-5 bottom-[5.25rem] bg-white [z-index:9999]">
          <div tw="flex items-center">
            {selectedDanjiSummary?.realestateType === RealestateType.Apartment && (
              <Chip tw="text-green-1000 bg-green">{describeRealestateType(selectedDanjiSummary?.realestateType)}</Chip>
            )}
            {selectedDanjiSummary?.realestateType === RealestateType.Officetel && (
              <Chip tw="text-nego-1000 bg-nego-100">
                {describeRealestateType(selectedDanjiSummary?.realestateType)}
              </Chip>
            )}
            {selectedDanjiSummary?.realestateType === RealestateType.Dasaedae && (
              <Chip tw="text-green-1000 bg-orange">{describeRealestateType(selectedDanjiSummary?.realestateType)}</Chip>
            )}
            {selectedDanjiSummary?.realestateType === RealestateType.Dagagoo && (
              <Chip tw="text-orange-1000 bg-green">{describeRealestateType(selectedDanjiSummary?.realestateType)}</Chip>
            )}
            {selectedDanjiSummary?.realestateType === RealestateType.Yunrip && (
              <Chip tw="text-gray-1000 bg-gray-100">
                {describeRealestateType(selectedDanjiSummary?.realestateType)}
              </Chip>
            )}
            {selectedDanjiSummary?.realestateType === RealestateType.Dandok && (
              <Chip tw="text-blue-1000 bg-blue-100">
                {describeRealestateType(selectedDanjiSummary?.realestateType)}
              </Chip>
            )}
            <span tw="text-info font-bold ml-2 [font-size: 1rem]">{selectedDanjiSummary?.string}</span>
            <CheveronDown style={{ marginLeft: 'auto', transform: 'rotate(270deg)', cursor: 'pointer' }} />
          </div>
          <div tw="flex items-center gap-2 mt-2 mb-2">
            <div>
              <span tw="text-info [line-height: 1rem]">매매&nbsp;&nbsp;</span>
              <span tw="font-bold text-info [line-height: 1rem] text-nego-1000">
                {selectedDanjiSummary?.buyListingCount}
              </span>
            </div>
            <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
            <div>
              <span tw="text-info [line-height: 1rem]">전월세&nbsp;&nbsp;</span>
              <span tw="font-bold text-info [line-height: 1rem] text-green-1000">
                {selectedDanjiSummary?.rentListingCount}
              </span>
            </div>
            <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
            <span tw="text-info [line-height: 1rem] text-gray-700">
              사용승인일 {selectedDanjiSummary?.useAcceptedYear || '-'}
            </span>
            <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
            <span tw="text-info [line-height: 1rem] text-gray-700">
              {selectedDanjiSummary?.saedaeCount.toLocaleString() || '-'}세대
            </span>
          </div>
          <div tw="flex items-center gap-2 mt-2 mb-5">
            <Chip tw="text-yellow-1000 bg-yellow">최근 실거래</Chip>
            <span tw="text-info [line-height: 1rem] text-gray-700">
              {`거래일 ${selectedDanjiSummary?.latestDealDate}` || '-'}
            </span>
          </div>
          {(!!selectedDanjiSummary.buyPrice || !!selectedDanjiSummary.rentPrice) && (
            <div tw="flex flex-col gap-2 mt-2">
              {!!selectedDanjiSummary?.buyPrice && (
                <div tw="flex items-center">
                  <span tw="text-b2 [margin-right: 3.75rem]">매매</span>
                  <span tw="text-b2 font-bold">{formatNumberInKorean(selectedDanjiSummary?.buyPrice || 0)}</span>
                </div>
              )}
              {!!selectedDanjiSummary?.rentPrice && (
                <div>
                  <span tw="text-b2 [margin-right: 3rem]">전월세</span>
                  <span tw="text-b2 font-bold">{formatNumberInKorean(selectedDanjiSummary?.rentPrice || 0)}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default function MobMapLayout() {
  return <MapWrapper />;
}
