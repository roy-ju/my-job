/* eslint-disable consistent-return */
import { ChangeEventHandler, ReactNode, useCallback, useState } from 'react';

import { Button, Checkbox } from '@/components/atoms';

import { Filter } from '@/components/organisms/MapFilter/types';

import { ListingSummary } from '@/hooks/useMobileMapLayout';

import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import Close from '@/assets/icons/close_24.svg';

import BottomGlobalNavigation from '@/components/organisms/global/BottomGlobalNavigation';

import MobileMapHeader from '@/components/domains/map/MobileMapHeader';

import MobileMapControls from '@/components/domains/map/MobileMapControls';

import MobileMapPositionBar from '@/components/domains/map/MobileMapPositionBar';

import MobileMapToggleButton from '@/components/domains/map/MobileMapToggleButton';

import MobileMapFilter from '@/components/domains/map/MobileMapFilter';

import MobileMapPriceSelect from '@/components/domains/map/MobileMapPriceSelect';

import RegionSelect from './RegionSelect';

import GuideOverlay from './GuideOverlay';

interface MapLayoutContainerProps {
  code?: string;
  mapType?: string;
  priceType?: string;
  unreadChatCount?: number;
  mapLayer?: string;
  mapToggleValue?: number;
  schoolType?: string;
  filter?: Filter;
  centerAddress?: string[];
  listingCount?: number;
  selctedListingSummary: ListingSummary | null;
  priceSelectDisabled?: boolean;
  onClickCurrentLocation?: () => void;
  onClickSchool?: () => void;
  onClickMapLayerCadastral?: () => void;
  onClickMapLayerStreet?: () => void;
  onChangeMapType?: ChangeEventHandler<HTMLInputElement>;
  onChangeSchoolType?: ChangeEventHandler<HTMLInputElement>;
  onMapSearchSubmit?: (item: KakaoAddressAutocompleteResponseItem) => void;
  onChangeFilter?: (filter: Partial<Filter>) => void;
  onChangeMapToggleValue?: (value: number) => void;
  onChangePriceType?: (value: string) => void;
  onTogglepanelsVisibility?: () => void;
  onClickMapListingList?: () => void;
  onClickSuggestReginoal?: () => void;
  children?: ReactNode;
  myMarker?: {
    lat: number;
    lng: number;
  } | null;
  isGeoLoading?: boolean;
  removeMyMarker?: () => void;
}

export default function MapLayoutContainer({
  code,
  mapType,
  priceType,
  mapLayer,
  schoolType,
  filter,
  centerAddress,
  mapToggleValue,
  listingCount,
  myMarker,
  isGeoLoading,

  priceSelectDisabled = false,
  onClickCurrentLocation,
  onClickMapLayerCadastral,
  onClickMapLayerStreet,
  onChangeMapType,
  onClickSchool,
  onChangeSchoolType,
  onChangeFilter,
  onChangeMapToggleValue,
  onChangePriceType,
  onClickMapListingList,
  onClickSuggestReginoal,
  children,
  removeMyMarker,
}: MapLayoutContainerProps) {
  const [isRenderGuideOverlay, setIsRenderGuideOverlay] = useState(false);

  const handleGuidOverlay = useCallback(() => {
    setIsRenderGuideOverlay(false);
  }, []);

  const [regionSelectPopup, setRegionSelectPopup] = useState(false);

  const handleOpenRegionSelectPopup = useCallback(() => {
    setRegionSelectPopup(true);
  }, []);

  const handleCloseRegionSelectPopup = useCallback(() => {
    setRegionSelectPopup(false);
  }, []);

  return (
    <>
      <div tw="flex flex-col w-full h-full overflow-y-hidden mx-auto items-center">
        <MobileMapHeader />
        {isRenderGuideOverlay && <GuideOverlay disappearGuideOverlay={handleGuidOverlay} />}
        <MobileMapFilter filter={filter} onChangeFilter={onChangeFilter} />
        <div id="map-container" tw="relative flex-1 w-full">
          {filter?.realestateTypeGroup === 'apt,oftl' && (
            <div tw="absolute left-4 top-3 z-20 flex justify-center pointer-events-none">
              <div tw="w-fit pointer-events-auto">
                <MobileMapToggleButton value={mapToggleValue} onChange={onChangeMapToggleValue} />
              </div>
            </div>
          )}

          {isRenderGuideOverlay && (
            <div tw="absolute left-4 top-3 z-20 flex justify-center pointer-events-none [z-index: 9000]">
              <div tw="w-fit pointer-events-none">
                <MobileMapToggleButton value={mapToggleValue} />
              </div>
              <span
                tw="pointer-events-none absolute top-[4rem] left-[5rem] text-info [line-height: 1rem] text-white"
                style={{ whiteSpace: 'nowrap' }}
              >
                지도에 표기되는 가격정보의 종류를 바꿀수 있어요
              </span>
            </div>
          )}

          <div tw="absolute right-4 top-3 z-20">
            <MobileMapPriceSelect
              filter={filter}
              value={priceType}
              disabled={priceSelectDisabled}
              onChange={onChangePriceType}
              onChangeFilter={onChangeFilter}
            />
          </div>

          <div tw="absolute right-5 top-[4rem] flex flex-col gap-3 z-[10]">
            <MobileMapControls.Group>
              <MobileMapControls.MapButton selected value={mapType} onChange={onChangeMapType} />
              <MobileMapControls.StreetViewButton selected={mapLayer === 'street'} onClick={onClickMapLayerStreet} />
              <MobileMapControls.CadastralButton
                selected={mapLayer === 'cadastral'}
                onClick={onClickMapLayerCadastral}
              />
              <MobileMapControls.SchoolButton
                selected={schoolType !== 'none'}
                value={schoolType}
                onChange={onChangeSchoolType}
                onClick={onClickSchool}
              />
            </MobileMapControls.Group>
            <MobileMapControls.GPSButton
              onClick={myMarker ? removeMyMarker : onClickCurrentLocation}
              isGeoLoading={isGeoLoading}
              selected={!!myMarker}
            />
          </div>

          <div tw="w-full inline-flex absolute left-0 right-0 bottom-6 px-4 z-10 gap-3">
            <MobileMapPositionBar eubmyundong={centerAddress?.[2]} onClick={handleOpenRegionSelectPopup} />
            <Button size="medium" tw="whitespace-nowrap font-bold rounded-4xl" onClick={onClickMapListingList}>
              매물 {listingCount ?? 0}
            </Button>

            <Button variant="outlined" size="medium" tw="ml-auto whitespace-nowrap" onClick={onClickSuggestReginoal}>
              매물 추천받기
            </Button>
          </div>

          {isRenderGuideOverlay && (
            <div tw="w-full inline-flex justify-between absolute left-0 right-0 bottom-6 px-4 z-10 [z-index: 9000]">
              <Button variant="outlined" size="medium" tw="ml-auto whitespace-nowrap pointer-events-none">
                매물 추천받기
              </Button>
              <span tw="pointer-events-none absolute right-[1rem] bottom-[-2rem] text-info [line-height: 1rem] text-white">
                원하는 조건의 매물 &apos;추천을&apos; 요청할 수 있어요
              </span>
            </div>
          )}

          {children}
        </div>

        {isRenderGuideOverlay && (
          <div tw="w-full pointer-events-auto flex items-center justify-between px-5 pb-9 absolute bottom-0 [z-index: 9000]">
            <div tw="flex items-center gap-2">
              <Checkbox />
              <span tw="pointer-events-auto text-info [line-height: 1rem] text-white">다시보지 않기</span>
            </div>
            <Close style={{ color: 'white', cursor: 'pointer' }} />
          </div>
        )}

        <BottomGlobalNavigation index={2} />
      </div>

      {regionSelectPopup && (
        <RegionSelect code={code} centerAddress={centerAddress} handleClose={handleCloseRegionSelectPopup} />
      )}
    </>
  );
}
