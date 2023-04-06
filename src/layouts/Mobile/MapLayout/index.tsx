/* eslint-disable consistent-return */
import OutsideClick from '@/components/atoms/OutsideClick';

import { Map } from '@/lib/navermap';
import { MapLayout as Layout, MobGuideOverlay, MobMapStreetView } from '@/components/templates';
import { AnimatePresence, motion } from 'framer-motion';
import MobLayoutMapContainer from '@/components/templates/MobMapLayout';
import MobileGlobalStyles from '@/styles/MobileGlobalStyles';

import CheveronDown from '@/assets/icons/chevron_down_24.svg';

import { useEffect, useState } from 'react';

import { Chip, Separator } from '@/components/atoms';
import { RealestateType, describeRealestateType, describeTargetPrice, describeBiddingPrice } from '@/constants/enums';
import { formatNumberInKorean } from '@/utils';
import Markers from './Markers';
import useMapLayout from './useMapLayout';

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
    selctedListingSummary,
    selectedSchoolID,
    priceType,
    streetViewEvent,
    ...props
  } = useMapLayout();

  const [isRenderGuideOverlay, setIsRenderGuideOverlay] = useState(false);

  const disappearGuideOverlay = () => {
    setIsRenderGuideOverlay(false);
  };

  useEffect(() => {
    if (localStorage.getItem('neogico-mob-map-initial') === 'true') {
      setIsRenderGuideOverlay(false);
      return;
    }
    if (!localStorage.getItem('neogico-mob-map-initial')) {
      localStorage.setItem('neogico-mob-map-initial', 'true');
      setIsRenderGuideOverlay(true);
    }
    return () => setIsRenderGuideOverlay(false);
  }, []);

  useEffect(() => {
    if (isRenderGuideOverlay) {
      const timeout = setTimeout(() => setIsRenderGuideOverlay(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [isRenderGuideOverlay]);

  return (
    <>
      {isRenderGuideOverlay && <MobGuideOverlay disappearGuideOverlay={disappearGuideOverlay} />}
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

      {selctedListingSummary && (
        <div tw="w-[100%] max-w-mobile [border-bottom-width: 1px] border-b-gray-1100 absolute rounded-t-lg px-4 py-5 bottom-[5.25rem] bg-white [z-index:9999]">
          <div tw="flex items-center">
            {selctedListingSummary?.realestateType === RealestateType.Apartment && (
              <Chip tw="text-green-1000 bg-green">{describeRealestateType(selctedListingSummary?.realestateType)}</Chip>
            )}
            {selctedListingSummary?.realestateType === RealestateType.Officetel && (
              <Chip tw="text-nego-1000 bg-nego-100">
                {describeRealestateType(selctedListingSummary?.realestateType)}
              </Chip>
            )}
            {selctedListingSummary?.realestateType === RealestateType.Dasaedae && (
              <Chip tw="text-green-1000 bg-orange">
                {describeRealestateType(selctedListingSummary?.realestateType)}
              </Chip>
            )}
            {selctedListingSummary?.realestateType === RealestateType.Dagagoo && (
              <Chip tw="text-orange-1000 bg-green">
                {describeRealestateType(selctedListingSummary?.realestateType)}
              </Chip>
            )}
            {selctedListingSummary?.realestateType === RealestateType.Yunrip && (
              <Chip tw="text-gray-1000 bg-gray-100">
                {describeRealestateType(selctedListingSummary?.realestateType)}
              </Chip>
            )}
            {selectedDanjiSummary?.realestateType === RealestateType.Dandok && (
              <Chip tw="text-blue-1000 bg-blue-100">
                {describeRealestateType(selctedListingSummary?.realestateType)}
              </Chip>
            )}
            <span tw="text-info font-bold ml-2 [font-size: 1rem]">{selctedListingSummary?.listingTitle}</span>
            <CheveronDown style={{ marginLeft: 'auto', transform: 'rotate(270deg)', cursor: 'pointer' }} />
          </div>

          <div tw="flex items-center gap-3 mt-2 mb-3">
            <span tw="text-info [line-height: 1rem] text-gray-700">
              공급 {selctedListingSummary.gonggeupArea || '-'}㎡
            </span>
            <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
            <span tw="text-info [line-height: 1rem] text-gray-700">
              전용 {selctedListingSummary.jeonyoungArea || '-'}㎡
            </span>
          </div>

          <div tw="flex items-center gap-2 mt-2">
            <div tw="flex flex-col">
              <span tw="text-b2">
                {describeTargetPrice({
                  negotiation_or_auction: selctedListingSummary.negotiationOrAuction,
                  isOwnerLabel: true,
                })}
              </span>
              <span tw="text-b2">{`최고 ${describeBiddingPrice({
                negotiation_or_auction: selctedListingSummary.negotiationOrAuction,
              })}`}</span>
            </div>

            <div tw="flex flex-col">
              <span tw="text-b2 font-bold">
                {selctedListingSummary.tradeOrDepositPrice
                  ? formatNumberInKorean(selctedListingSummary.tradeOrDepositPrice)
                  : '-'}{' '}
                {selctedListingSummary.monthlyRentFee > 0 &&
                  `/ ${formatNumberInKorean(selctedListingSummary.monthlyRentFee)}`}
              </span>
              <span tw="text-b2 font-bold">
                {selctedListingSummary.biddingTradeOrDepositPrice
                  ? formatNumberInKorean(selctedListingSummary.biddingTradeOrDepositPrice)
                  : '-'}{' '}
                {selctedListingSummary.biddingMonthlyRentFee > 0 &&
                  `/ ${formatNumberInKorean(selctedListingSummary.biddingMonthlyRentFee || 0)}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function MobMapLayout() {
  return <MapWrapper />;
}
