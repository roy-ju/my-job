import { useMemo, useState } from 'react';

export default function useMapStreetViewMobile({ position }: { position: { lat: number; lng: number } }) {
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

  return { context };
}
