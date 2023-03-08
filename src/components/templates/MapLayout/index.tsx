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
} from '@/components/organisms';
import { Button } from '@/components/atoms';

import RefreshOrangeIcon from '@/assets/icons/refresh_orange.svg';
import HouseGreenIcon from '@/assets/icons/house_green.svg';

interface LayoutMainProps {
  children?: ReactNode;
}

interface LayoutPanelsProps {
  children?: ReactNode;
}

interface LayoutMapContainerProps {
  mapType?: string;
  schoolType?: string;
  onClickCurrentLocation?: () => void;
  onClickZoomIn?: () => void;
  onClickZoomOut?: () => void;
  onClickSchool?: () => void;
  onClickMapTypeCadastral?: () => void;
  onClickMapTypeStreet?: () => void;
  onClickMapTypeNormal?: () => void;
  onChangeSchoolType?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
}

function LayoutMain({ children }: LayoutMainProps) {
  return (
    <div tw="flex h-full w-full flex-row overflow-hidden">
      <div tw="z-30">
        <GlobalNavigation>
          <GlobalNavigation.TabButton idx={0} text="홈" icon={<Home />} />
          <GlobalNavigation.TabButton idx={1} text="지도" icon={<MapPin />} />
          <GlobalNavigation.TabButton
            idx={2}
            text="나의거래"
            icon={<Bidding />}
          />
          <GlobalNavigation.TabButton
            idx={3}
            text="문의목록"
            icon={<ChatBubble />}
          />
          <GlobalNavigation.TabButton idx={4} text="My네고" icon={<User />} />
        </GlobalNavigation>
      </div>
      {children}
    </div>
  );
}

function LayoutPanels({ children }: LayoutPanelsProps) {
  return (
    <div tw="flex flex-row h-full z-20 shadow-[-4px_0px_24px_rgba(0,0,0,0.1)]">
      {children}
    </div>
  );
}

function LayoutMapContainer({
  mapType,
  schoolType,
  onClickCurrentLocation,
  onClickMapTypeNormal,
  onClickMapTypeCadastral,
  onClickMapTypeStreet,
  onClickSchool,
  onClickZoomIn,
  onClickZoomOut,
  onChangeSchoolType,
  children,
}: LayoutMapContainerProps) {
  return (
    <div id="map-container" tw="relative flex-1">
      <div tw="absolute left-5 top-5 z-10 w-[380px] flex flex-col gap-2">
        <MapSearchTextField />
        <MapFilter />
      </div>

      <div tw="absolute right-5 top-5 z-20">
        <MapPriceSelect />
      </div>
      <div tw="absolute right-5 top-[84px] flex flex-col gap-6 z-10">
        <MapControls.Group>
          <MapControls.MapButton
            selected={mapType === 'normal'}
            onClick={onClickMapTypeNormal}
          />
          <MapControls.StreetViewButton
            selected={mapType === 'street'}
            onClick={onClickMapTypeStreet}
          />
          <MapControls.CadastralButton
            selected={mapType === 'cadastral'}
            onClick={onClickMapTypeCadastral}
          />
          <MapControls.SchoolButton
            selected={Boolean(schoolType)}
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
        <Button
          variant="ghost"
          tw="bg-white font-bold shadow hover:bg-gray-300"
        >
          <RefreshOrangeIcon style={{ marginRight: '0.5rem' }} />
          중개사 사이트
        </Button>
        <Button
          variant="ghost"
          tw="bg-white font-bold shadow hover:bg-gray-300"
        >
          <HouseGreenIcon style={{ marginRight: '0.5rem' }} />집 내놓기
        </Button>
      </div>
      <div tw="inline-flex w-fit absolute left-0 right-0 bottom-10 mx-auto z-10">
        <Button size="medium" tw="shadow font-bold rounded-4xl">
          이 지역 매물 12
        </Button>
      </div>
      {children}
    </div>
  );
}

export default Object.assign(LayoutMain, {
  Panels: LayoutPanels,
  MapContainer: LayoutMapContainer,
});
