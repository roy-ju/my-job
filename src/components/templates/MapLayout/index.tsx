import { ChangeEventHandler, Children, isValidElement, ReactNode } from 'react';
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
import CloseIcon from '@/assets/icons/close.svg';
import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';

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
          <GlobalNavigation.TabButton idx={4} text="마이페이지" icon={<User />} />
          {process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' && (
            <GlobalNavigation.TabButton idx={5} text="개발자설정" icon={<User />} />
          )}
        </GlobalNavigation>
      </div>
      {children}
    </div>
  );
}

interface LayoutPanelsProps {
  visible?: boolean;
  // onAnimationComplete?: () => void;
  children?: ReactNode;
}

function LayoutPanels({ visible = true, children }: LayoutPanelsProps) {
  // 페이지 컴포넌트가 리마운트 되는 이슈가 있어서 일단 애니메이션 빼고...

  return (
    <div css={[tw`z-20 flex flex-row h-full`, !visible && tw`hidden`]}>
      {/* {Children.toArray(children).map((child, index) =>
        isValidElement(child) ? (
          <div tw="shadow overflow-hidden animate-panelSlideIn" key={child.props.route ? `panel-${index}` : `${index}`}>
            {child}
          </div>
        ) : null,
      )} */}
      {children}
    </div>
  );
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
  onClickClosePanel?: () => void;
  onTogglepanelsVisibility?: () => void;
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
  showClosePanelButton = false,
  panelsVisible = true,
  priceSelectDisabled = false,
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
  onClickClosePanel,
  onTogglepanelsVisibility,
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
        {showClosePanelButton && (
          <button
            tw="w-10 h-10 flex items-center justify-center bg-nego p-2 text-white rounded-tr-lg rounded-br-lg shadow hover:bg-nego-600"
            type="button"
            onClick={onClickClosePanel}
          >
            <CloseIcon />
          </button>
        )}
        <div tw="flex flex-col gap-2 w-[380px] ml-5">
          <MapSearchTextField onSubmit={onMapSearchSubmit} />
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
