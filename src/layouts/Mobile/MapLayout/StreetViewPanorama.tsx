import tw, { styled } from 'twin.macro';

import { Panorama } from '@/lib/navermap';

import useStreetView from './hooks/useStreetView';

const PanoramaContainer = styled.div`
  ${tw`relative overflow-hidden transition-all`}
`;

const PanoramaWrraper = styled.div`
  ${tw`absolute top-0 left-0 z-10 w-full h-full`}
`;

export default function StreetViewPanorama() {
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
