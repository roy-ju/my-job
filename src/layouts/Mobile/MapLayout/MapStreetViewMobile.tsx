import { ReactNode } from 'react';

import tw, { styled } from 'twin.macro';

import { Button } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import Close from '@/assets/icons/close_24.svg';

import MapStreetViewContext from './context/MapStreetViewContext';

import useMapStreetViewMobile from './hooks/useMapStreetViewMobile';

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

export default function MapStreetViewMobile({ title, position, onClickBackButton, children }: Props) {
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
