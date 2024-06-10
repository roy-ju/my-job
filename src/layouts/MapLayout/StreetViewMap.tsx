import { useCallback, useContext, useEffect, useState } from 'react';

import tw from 'twin.macro';

import { Map, NaverMap } from '@/lib/navermap';

import MapStreetViewContext from './context/MapStreetViewContext';

export default function StreetViewMap() {
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  const context = useContext(MapStreetViewContext);

  const onCreate = useCallback((m: NaverMap) => {
    const streetLayer = new naver.maps.StreetLayer();
    streetLayer.setMap(m);

    setMap(m);
  }, []);

  const onMapClick = useCallback(
    (_: NaverMap, e: { latlng: naver.maps.LatLng }) => {
      context.panorama?.setPosition(e.latlng);
    },
    [context.panorama],
  );

  useEffect(() => {
    map?.autoResize();
  }, [context.expanded, map]);

  if (!context.position) return null;

  return (
    <div css={context.expanded ? tw`block h-[30%]` : tw`hidden`}>
      <Map center={context.position} zoom={18} onCreate={onCreate} onClick={onMapClick} />
    </div>
  );
}
