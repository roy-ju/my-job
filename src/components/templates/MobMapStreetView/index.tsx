import { NavigationHeader } from '@/components/molecules';
import { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Close from '@/assets/icons/close_24.svg';
import tw from 'twin.macro';
import { Map, NaverMap, Panorama } from '@/lib/navermap';
import { Button } from '@/components/atoms';
import MapStreetViewContext from './MapStreetViewContext';

interface Props {
  title: string;
  position: { lat: number; lng: number };

  onClickBackButton?: () => void;
  children?: ReactNode;
}

function MobMapStreetView({ title, position, onClickBackButton, children }: Props) {
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
    <div tw="w-full h-full bg-white overflow-hidden flex flex-col">
      <NavigationHeader tw="px-5">
        <NavigationHeader.Title>{title}</NavigationHeader.Title>
        <Button variant="ghost" onClick={onClickBackButton} tw="px-0">
          <Close />
        </Button>
      </NavigationHeader>
      <div tw="relative flex-1">
        <MapStreetViewContext.Provider value={context}>{children}</MapStreetViewContext.Provider>
      </div>
    </div>
  );
}

function StreetViewPanorama() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { setPanorama, panorama, expanded, position } = useContext(MapStreetViewContext);
  const onCreate = useCallback(
    (p: naver.maps.Panorama) => {
      setPanorama(p);
    },
    [setPanorama],
  );

  useEffect(() => {
    const callback = () => {
      if (!containerRef.current || !panorama) return;
      if (!naver.maps) return;

      const { offsetWidth, offsetHeight } = containerRef.current;

      const size = new naver.maps.Size(offsetWidth, offsetHeight);

      panorama.setSize(size);
    };

    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [panorama]);

  if (!position) return null;

  return (
    <div css={[tw`relative overflow-hidden transition-all`, expanded ? tw`h-[70%]` : tw`h-[100%]`]}>
      <div ref={containerRef} tw="absolute left-0 top-0 z-10 w-full h-full">
        <Panorama position={position} onCreate={onCreate} />
      </div>
    </div>
  );
}

function StreetViewMap() {
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

export default Object.assign(MobMapStreetView, {
  Panorama: StreetViewPanorama,
  Map: StreetViewMap,
});
