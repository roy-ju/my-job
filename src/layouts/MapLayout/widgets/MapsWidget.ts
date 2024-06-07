import tw, { styled } from 'twin.macro';

export const MapStreetViewContainer = styled.div`
  ${tw`flex flex-col w-full h-full overflow-hidden bg-white rounded-lg`}
`;

export const MapStreetViewProviderWrraper = styled.div`
  ${tw`relative flex flex-col flex-1`}
`;

export const StreetViewPanoramaWrraper = styled.div`
  ${tw`absolute top-0 left-0 z-10 w-full h-full`}
`;

export const ExpandedPanoramaButton = styled.button`
  ${tw`absolute z-20 flex items-center justify-center w-10 h-10 bg-white rounded-lg right-4 bottom-4`}
`;
