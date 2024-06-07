import { ReactNode } from 'react';

import tw, { styled } from 'twin.macro';

import { Button } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import { Panorama } from '@/lib/navermap';

import Close from '@/assets/icons/close_24.svg';

import MapStreetViewContext from './context/MapStreetViewContext';

import useMapStreetViewMobile from './hooks/useMapStreetViewMobile';

import useStreetView from './hooks/useStreetView';

interface Props {
  title: string;
  position: { lat: number; lng: number };

  onClickBackButton?: () => void;
  children?: ReactNode;
}

const MapStreetViewMobileContainer = styled.div`
  ${tw`flex flex-col w-full h-full overflow-hidden bg-white`}
`;

const ProviderWrraper = styled.div`
  ${tw`relative flex-1`}
`;

const PanoramaContainer = styled.div`
  ${tw`relative overflow-hidden transition-all`}
`;

const PanoramaWrraper = styled.div`
  ${tw`absolute top-0 left-0 z-10 w-full h-full`}
`;

function MapStreetViewMobile({ title, position, onClickBackButton, children }: Props) {
  const { context } = useMapStreetViewMobile({ position });

  return (
    <MapStreetViewMobileContainer>
      <NavigationHeader tw="px-5">
        <NavigationHeader.Title>{title}</NavigationHeader.Title>
        <Button variant="ghost" onClick={onClickBackButton} tw="px-0">
          <Close />
        </Button>
      </NavigationHeader>
      <ProviderWrraper>
        <MapStreetViewContext.Provider value={context}>{children}</MapStreetViewContext.Provider>
      </ProviderWrraper>
    </MapStreetViewMobileContainer>
  );
}

function StreetViewPanorama() {
  const { expanded, onCreate, position, containerRef } = useStreetView();

  if (!position) return null;

  return (
    <PanoramaContainer css={[expanded ? tw`h-[70%]` : tw`h-[100%]`]}>
      <PanoramaWrraper ref={containerRef}>
        <Panorama position={position} onCreate={onCreate} />
      </PanoramaWrraper>
    </PanoramaContainer>
  );
}

export default Object.assign(MapStreetViewMobile, {
  Panorama: StreetViewPanorama,
});
