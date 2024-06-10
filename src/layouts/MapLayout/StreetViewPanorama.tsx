import { useRef, useContext, useCallback } from 'react';

import tw from 'twin.macro';

import { Panorama } from '@/lib/navermap';

import ChevronDown from '@/assets/icons/chevron_down.svg';

import MapStreetViewContext from './context/MapStreetViewContext';

import { ExpandedPanoramaButton, StreetViewPanoramaWrraper } from './widgets/MapsWidget';

export default function StreetViewPanorama() {
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
      <StreetViewPanoramaWrraper ref={containerRef}>
        <Panorama position={position} onCreate={onCreate} />
      </StreetViewPanoramaWrraper>
      <ExpandedPanoramaButton
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
      </ExpandedPanoramaButton>
    </div>
  );
}
