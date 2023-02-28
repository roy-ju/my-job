import { ReactNode } from 'react';
import Home from '@/assets/icons/home.svg';
import MapPin from '@/assets/icons/map_pin.svg';
import Bidding from '@/assets/icons/bidding.svg';
import ChatBubble from '@/assets/icons/chat_bubble.svg';
import User from '@/assets/icons/user.svg';
import { MapControls, GlobalNavigation } from '@/components/organisms';

type PropsWithChildren = { children?: ReactNode };

function LayoutMain({ children }: PropsWithChildren) {
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

function LayoutPanels({ children }: PropsWithChildren) {
  return (
    <div tw="flex flex-row h-full z-20 shadow-[-4px_0px_24px_rgba(0,0,0,0.1)]">
      {children}
    </div>
  );
}

function LayoutMapContainer({ children }: PropsWithChildren) {
  return (
    <div id="map-container" tw="relative flex-1 z-10">
      <div tw="absolute right-5 top-5 flex flex-col gap-6 z-10">
        <MapControls.Group>
          <MapControls.MapButton />
          <MapControls.RoadMapButton />
          <MapControls.MapTileButton />
          <MapControls.SchoolButton />
        </MapControls.Group>
        <MapControls.Group>
          <MapControls.ZoomInButton />
          <MapControls.ZoomOutButton />
        </MapControls.Group>
        <MapControls.GPSButton />
      </div>
      {children}
    </div>
  );
}

export default Object.assign(LayoutMain, {
  Panels: LayoutPanels,
  MapContainer: LayoutMapContainer,
});
