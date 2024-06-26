import { ChangeEventHandler, ReactNode } from 'react';

import tw from 'twin.macro';

import { Button } from '@/components/atoms';

import MapControls from '@/components/domains/map/MapControls';

import MapPriceSelect from '@/components/domains/map/MapPriceSelect';

import MapPositionBar from '@/components/domains/map/MapPositionBar';

import MapToggleButton from '@/components/domains/map/MapToggleButton';

import MapSearchTextField from '@/components/domains/map/MapSearchTextField';

import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import RefreshOrangeIcon from '@/assets/icons/refresh_orange.svg';

import HouseGreenIcon from '@/assets/icons/house_green.svg';

import CloseIcon from '@/assets/icons/close.svg';

import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';

import LayoutMain from './LayoutMain';

import MapFilter from './pc-map-filter';

import { Filter } from './pc-map-filter/types';

const Overlay = tw.div`fixed left-0 right-0 top-0 bottom-0 z-[1000] bg-[rgba(0,0,0,0.4)]`;

interface LayoutPanelsProps {
  visible?: boolean;
  children?: ReactNode;
}

function LayoutPanels({ visible = true, children }: LayoutPanelsProps) {
  return <div css={[tw`z-40 flex flex-row h-full`, !visible && tw`hidden`]}>{children}</div>;
}

interface LayoutMapContainerProps {
  mapType?: string;
  priceType?: string;
  mapLayer?: string;
  mapToggleValue?: number;
  schoolType?: string;
  filter?: Filter;
  centerAddress?: string[];
  listingCount?: number;
  showClosePanelButton?: boolean;
  panelsVisible?: boolean;
  priceSelectDisabled?: boolean;
  recentSearches?: KakaoAddressAutocompleteResponseItem[];
  isGeoLoading?: boolean;
  myMarker?: {
    lat: number;
    lng: number;
  } | null;
  onClickCurrentLocation?: () => void;
  onClickZoomIn?: () => void;
  onClickZoomOut?: () => void;
  onClickSchool?: () => void;
  onClickMapLayerCadastral?: () => void;
  onClickMapLayerStreet?: () => void;
  onClickSuggestForm?: () => void;
  onClickLogo?: () => void;
  onChangeMapType?: ChangeEventHandler<HTMLInputElement>;
  onChangeSchoolType?: ChangeEventHandler<HTMLInputElement>;
  onMapSearchSubmit?: (item: KakaoAddressAutocompleteResponseItem, isFromRecentSearch: boolean) => void;
  onChangeFilter?: (filter: Partial<Filter>) => void;
  onChangeMapToggleValue?: (value: number) => void;
  onChangePriceType?: (value: string) => void;
  onClickClosePanel?: () => void;
  onClickMapListingList?: () => void;
  onClickListingCreateAddress?: () => void;
  onClickAgentSite?: () => void;
  onTogglepanelsVisibility?: () => void;
  onClickRemoveAllRecentSearches?: () => void;
  onClickRemoveRecentSearch?: (id: string) => void;
  removeMyMarker?: () => void;
  children?: ReactNode;
}

function LayoutMapContainer({
  mapType,
  priceType,
  mapLayer,
  schoolType,
  filter,
  isGeoLoading,
  centerAddress,
  mapToggleValue,
  listingCount,
  myMarker,
  showClosePanelButton = false,
  panelsVisible = true,
  priceSelectDisabled = false,
  recentSearches,
  onClickCurrentLocation,
  onClickMapLayerCadastral,
  onClickMapLayerStreet,
  onClickSuggestForm,
  onChangeMapType,
  onClickSchool,
  onClickZoomIn,
  onClickZoomOut,
  onChangeSchoolType,
  onMapSearchSubmit,
  onChangeFilter,
  onChangeMapToggleValue,
  onChangePriceType,
  onClickClosePanel,
  onClickMapListingList,
  onClickAgentSite,
  onClickListingCreateAddress,
  onTogglepanelsVisibility,
  onClickRemoveAllRecentSearches,
  onClickRemoveRecentSearch,
  removeMyMarker,
  children,
}: LayoutMapContainerProps) {
  return (
    <div id="map-container" tw="relative flex-1">
      <div tw="absolute left-5 bottom-5 z-10">
        <Button
          variant="ghost"
          size="none"
          tw="flex-col w-10 h-10 bg-white shadow hover:bg-gray-300"
          onClick={onTogglepanelsVisibility}
        >
          <ChevronLeftIcon style={{ transform: panelsVisible ? 'rotate(0deg)' : 'rotate(180deg)' }} />
        </Button>
      </div>

      <div tw="absolute top-5 left-0 z-10 flex">
        {showClosePanelButton && panelsVisible && (
          <button
            tw="w-10 h-10 flex items-center justify-center bg-nego p-2 text-white rounded-tr-lg rounded-br-lg shadow hover:bg-nego-600"
            type="button"
            onClick={onClickClosePanel}
          >
            <CloseIcon />
          </button>
        )}
        <div tw="flex flex-col gap-2 w-[380px] ml-5">
          <MapSearchTextField
            recentSearches={recentSearches}
            onSubmit={onMapSearchSubmit}
            onClickRemoveAllRecentSearches={onClickRemoveAllRecentSearches}
            onClickRemoveRecentSearch={onClickRemoveRecentSearch}
          />
          <MapFilter filter={filter} onChangeFilter={onChangeFilter} />
        </div>
      </div>

      {filter?.realestateTypeGroup === 'apt,oftl' && (
        <div tw="absolute left-[400px] right-[139px] top-5 z-20 flex justify-center pointer-events-none">
          <div tw="w-fit pointer-events-auto">
            <MapToggleButton value={mapToggleValue} onChange={onChangeMapToggleValue} />
          </div>
        </div>
      )}

      <div tw="absolute right-5 top-5 z-20">
        <MapPriceSelect disabled={priceSelectDisabled} value={priceType} onChange={onChangePriceType} />
      </div>
      <div tw="absolute right-5 top-[84px] flex flex-col gap-6 z-10">
        <MapControls.Group>
          <MapControls.MapButton selected value={mapType} onChange={onChangeMapType} />
          <MapControls.StreetViewButton selected={mapLayer === 'street'} onClick={onClickMapLayerStreet} />
          <MapControls.CadastralButton selected={mapLayer === 'cadastral'} onClick={onClickMapLayerCadastral} />
          <MapControls.SchoolButton
            selected={schoolType !== 'none'}
            value={schoolType}
            onChange={onChangeSchoolType}
            onClick={onClickSchool}
          />
        </MapControls.Group>
        <MapControls.GPSButton
          onClick={myMarker ? removeMyMarker : onClickCurrentLocation}
          isGeoLoading={isGeoLoading}
          selected={!!myMarker}
        />
        <MapControls.Group>
          <MapControls.ZoomInButton onClick={onClickZoomIn} />
          <MapControls.ZoomOutButton onClick={onClickZoomOut} />
        </MapControls.Group>
      </div>
      <div tw="absolute right-5 bottom-[104px] z-10">
        <Button variant="ghost" size="none" tw="px-4 bg-white shadow hover:bg-gray-300" onClick={onClickSuggestForm}>
          <div tw="pt-5 pb-4 text-start mr-10">
            <span tw="text-info leading-4 whitespace-nowrap">찾으시는 매물이 없다면,</span>
            <br />
            <span tw="text-b2 font-bold leading-5 whitespace-nowrap">매물을 추천받아 보세요.</span>
          </div>
          <ChevronLeftIcon tw="text-gray-700 w-4 h-4 rotate-180" />
        </Button>
      </div>
      <div tw="absolute right-5 bottom-10 flex gap-2 z-10">
        <Button onClick={onClickAgentSite} variant="ghost" tw="bg-white font-bold shadow hover:bg-gray-300">
          <RefreshOrangeIcon style={{ marginRight: '0.5rem' }} />
          <span tw="whitespace-nowrap">중개사 사이트</span>
        </Button>
        <Button onClick={onClickListingCreateAddress} variant="ghost" tw="bg-white font-bold shadow hover:bg-gray-300">
          <HouseGreenIcon style={{ marginRight: '0.5rem' }} />
          <span tw="whitespace-nowrap">집 내놓기</span>
        </Button>
      </div>
      <div tw="inline-flex gap-2 w-fit absolute left-0 right-0 bottom-10 mx-auto z-10">
        {Boolean(centerAddress?.[0]) && (
          <MapPositionBar
            sido={centerAddress?.[0] ?? ''}
            sigungu={centerAddress?.[1]}
            eubmyundong={centerAddress?.[2]}
          />
        )}
        <Button onClick={onClickMapListingList} size="medium" tw="whitespace-nowrap font-bold rounded-4xl">
          이 지역 매물 {listingCount ?? 0}
        </Button>
      </div>
      {children}
    </div>
  );
}

export default Object.assign(LayoutMain, {
  Panels: LayoutPanels,
  MapContainer: LayoutMapContainer,
  Overlay,
});
