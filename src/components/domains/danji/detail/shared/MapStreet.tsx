import { createContext } from 'react';

import tw, { styled } from 'twin.macro';

import useBasicInfoDanjiMapStreetMobile from './hooks/useBasicInfoDanjiMapStreetMobile';

type MapStreeProps = {
  defaultMapSize?: string;
  center?: {
    lat: number;
    lng: number;
  };
  containerId?: string;
  bindPanorama?: (val: naver.maps.Panorama | null) => void;
};

const MapContainer = styled.div`
  ${tw`[flex: 1] outline-none`}
`;

const RelativeDivContainer = styled.div`
  ${tw`relative w-full [z-index: 2]`}
`;

export const NaverPanoramaContext = createContext<naver.maps.Panorama>(undefined as unknown as naver.maps.Panorama);

export function MapStreet({ defaultMapSize = '190px', center, containerId = 'panorama', bindPanorama }: MapStreeProps) {
  const { containerRef, mapHeight } = useBasicInfoDanjiMapStreetMobile({
    containerId,
    defaultMapSize,
    center,
    bindPanorama,
  });

  console.log('render');

  return (
    <>
      <MapContainer ref={containerRef} />
      <RelativeDivContainer
        id={containerId}
        style={{
          height: mapHeight,
        }}
      />
    </>
  );
}
