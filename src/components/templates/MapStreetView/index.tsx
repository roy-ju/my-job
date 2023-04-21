import { NavigationHeader } from '@/components/molecules';
import { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import ChevronDown from '@/assets/icons/chevron_down.svg';
import tw from 'twin.macro';
import { Map, NaverMap, Panorama } from '@/lib/navermap';
import MapStreetViewContext from './MapStreetViewContext';

interface Props {
  title: string;
  position: { lat: number; lng: number };

  onClickBackButton?: () => void;
  children?: ReactNode;
}

function MapStreetView({ title, position, onClickBackButton, children }: Props) {
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
  console.log('hi');

  return (
    <div tw="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBackButton} />
        <NavigationHeader.Title>{title}</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="relative flex-1 flex flex-col">
        <MapStreetViewContext.Provider value={context}>{children}</MapStreetViewContext.Provider>
      </div>
    </div>
  );
}

function StreetViewPanorama() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { setPanorama, setExpanded, expanded, position } = useContext(MapStreetViewContext);
  const onCreate = useCallback(
    (p: naver.maps.Panorama) => {
      setPanorama(p);
    },
    [setPanorama],
  );

  if (!position) return null;

  return (
    <div css={[tw`relative overflow-hidden transition-all`, expanded ? tw`h-[70%]` : tw`h-[100%]`]}>
      <div ref={containerRef} tw="absolute left-0 top-0 z-10 w-full h-full">
        <Panorama position={position} onCreate={onCreate} />
      </div>
      <button
        tw="bg-white w-10 h-10 rounded-lg flex items-center justify-center absolute right-4 bottom-4 z-20"
        style={{
          // 각도에 따른 상단 DIV - 각도에 따른 상단 absolute div 사라짐 => translate3d(0,0,0) 추가후 해결
          // fix: https://gist.github.com/chooco13/7ebe04639627f51a3c5cf310f14d22c5
          transform: 'translate3d(0,0,0)',
        }}
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span css={!expanded && tw`rotate-180`}>
          <ChevronDown />
        </span>
      </button>
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

export default Object.assign(MapStreetView, {
  Panorama: StreetViewPanorama,
  Map: StreetViewMap,
});
