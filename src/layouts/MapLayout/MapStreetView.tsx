import { ReactNode, useMemo, useState } from 'react';

import { NavigationHeader } from '@/components/molecules';

import MapStreetViewContext from './context/MapStreetViewContext';

import { MapStreetViewContainer, MapStreetViewProviderWrraper } from './widgets/MapsWidget';

interface Props {
  title: string;
  position: { lat: number; lng: number };
  onClickBackButton?: () => void;
  children?: ReactNode;
}

export default function MapStreetView({ title, position, onClickBackButton, children }: Props) {
  const [expanded, setExpanded] = useState(false);

  const [panorama, setPanorama] = useState<naver.maps.Panorama | null>(null);

  const context = useMemo(
    () => ({
      panorama,
      setPanorama,
      position: {
        lat: position.lat,
        lng: position.lng,
      },
      expanded,
      setExpanded,
    }),
    [position.lat, position.lng, expanded, panorama],
  );

  return (
    <MapStreetViewContainer>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBackButton} />
        <NavigationHeader.Title>{title}</NavigationHeader.Title>
      </NavigationHeader>
      <MapStreetViewProviderWrraper>
        <MapStreetViewContext.Provider value={context}>{children}</MapStreetViewContext.Provider>
      </MapStreetViewProviderWrraper>
    </MapStreetViewContainer>
  );
}
