import { ChangeEventHandler, ReactNode } from 'react';
import Home from '@/assets/icons/home.svg';
import MapPin from '@/assets/icons/map_pin.svg';
import Bidding from '@/assets/icons/bidding.svg';
import ChatBubble from '@/assets/icons/chat_bubble.svg';
import User from '@/assets/icons/user.svg';
import {
  MapControls,
  GlobalNavigation,
  MapPriceSelect,
  MapSearchTextField,
  MapFilter,
  MapToggleButton,
} from '@/components/organisms';
import { Button } from '@/components/atoms';
import RefreshOrangeIcon from '@/assets/icons/refresh_orange.svg';
import HouseGreenIcon from '@/assets/icons/house_green.svg';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { Filter } from '@/components/organisms/MapFilter/types';
import MapPositionBar from '@/components/organisms/MapPositionBar';
import tw from 'twin.macro';

interface LayoutMainProps {
  children?: ReactNode;
  tabIndex?: number;
  onChangeTab?: (index: number) => void;
}

function LayoutMain({ tabIndex, onChangeTab, children }: LayoutMainProps) {
  return (
    <div tw="flex h-full w-full flex-row overflow-hidden">
      <div tw="z-30">
        <GlobalNavigation tabIndex={tabIndex} onChangeTab={onChangeTab}>
          <GlobalNavigation.TabButton idx={0} text="홈" icon={<Home />} />
          <GlobalNavigation.TabButton idx={1} text="지도" icon={<MapPin />} />
          <GlobalNavigation.TabButton idx={2} text="나의거래" icon={<Bidding />} />
          <GlobalNavigation.TabButton idx={3} text="문의목록" icon={<ChatBubble />} />
          <GlobalNavigation.TabButton idx={4} text="My네고" icon={<User />} />
        </GlobalNavigation>
      </div>
      {children}
    </div>
  );
}
interface LayoutPanelsProps {
  children?: ReactNode;
}

function LayoutPanels({ children }: LayoutPanelsProps) {
  return <div tw="flex flex-row h-full z-20">{children}</div>;
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
  onClickCurrentLocation?: () => void;
  onClickZoomIn?: () => void;
  onClickZoomOut?: () => void;
  onClickSchool?: () => void;
  onClickMapLayerCadastral?: () => void;
  onClickMapLayerStreet?: () => void;
  onChangeMapType?: ChangeEventHandler<HTMLInputElement>;
  onChangeSchoolType?: ChangeEventHandler<HTMLInputElement>;
  onMapSearchSubmit?: (item: KakaoAddressAutocompleteResponseItem) => void;
  onChangeFilter?: (filter: Partial<Filter>) => void;
  onChangeMapToggleValue?: (value: number) => void;
  onChangePriceType?: (value: string) => void;
  children?: ReactNode;
}

function LayoutMapContainer({
  mapType,
  priceType,
  mapLayer,
  schoolType,
  filter,
  centerAddress,
  mapToggleValue,
  listingCount,
  onClickCurrentLocation,
  onClickMapLayerCadastral,
  onClickMapLayerStreet,
  onChangeMapType,
  onClickSchool,
  onClickZoomIn,
  onClickZoomOut,
  onChangeSchoolType,
  onMapSearchSubmit,
  onChangeFilter,
  onChangeMapToggleValue,
  onChangePriceType,
  children,
}: LayoutMapContainerProps) {
  return (
    <div id="map-container" tw="relative flex-1">
      <div tw="absolute left-5 top-5 z-10 w-[380px] flex flex-col gap-2">
        <MapSearchTextField onSubmit={onMapSearchSubmit} />
        <MapFilter filter={filter} onChangeFilter={onChangeFilter} />
      </div>

      {filter?.realestateTypeGroup === 'apt,oftl' && (
        <div tw="absolute left-[400px] right-[139px] top-5 z-20 flex justify-center pointer-events-none 2xl:left-0 2xl:right-0 2xl:mx-auto">
          <div tw="w-fit pointer-events-auto">
            <MapToggleButton value={mapToggleValue} onChange={onChangeMapToggleValue} />
          </div>
        </div>
      )}

      <div tw="absolute right-5 top-5 z-20">
        <MapPriceSelect value={priceType} onChange={onChangePriceType} />
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
        <MapControls.GPSButton onClick={onClickCurrentLocation} />
        <MapControls.Group>
          <MapControls.ZoomInButton onClick={onClickZoomIn} />
          <MapControls.ZoomOutButton onClick={onClickZoomOut} />
        </MapControls.Group>
      </div>
      <div tw="absolute right-5 bottom-10 flex gap-2 z-10">
        <Button variant="ghost" tw="bg-white font-bold shadow hover:bg-gray-300">
          <RefreshOrangeIcon style={{ marginRight: '0.5rem' }} />
          중개사 사이트
        </Button>
        <Button variant="ghost" tw="bg-white font-bold shadow hover:bg-gray-300">
          <HouseGreenIcon style={{ marginRight: '0.5rem' }} />집 내놓기
        </Button>
      </div>
      <div tw="inline-flex gap-2 w-fit absolute left-0 right-0 bottom-10 mx-auto z-10">
        <MapPositionBar sido={centerAddress?.[0] ?? ''} sigungu={centerAddress?.[1]} eubmyundong={centerAddress?.[2]} />
        <Button size="medium" tw="whitespace-nowrap font-bold rounded-4xl">
          이 지역 매물 {listingCount ?? 0}
        </Button>
      </div>
      {children}
    </div>
  );
}

const Overlay = tw.div`fixed left-0 right-0 top-0 bottom-0 z-[1000] bg-[rgba(0,0,0,0.4)]`;

export default Object.assign(LayoutMain, {
  Panels: LayoutPanels,
  MapContainer: LayoutMapContainer,
  Overlay,
});
