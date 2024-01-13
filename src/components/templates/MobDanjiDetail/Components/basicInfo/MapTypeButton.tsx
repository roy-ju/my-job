import { styled } from 'twin.macro';

import useMobileDanjiMap from '@/states/hooks/useMobileDanjiMap';

import DanjiRoadView from '@/assets/icons/danji_roadview.svg';

const StyledDiv = styled.div``;

export function MapTypeButton({
  type,
  bottom,
  right,
}: {
  type: string;
  bottom: string | number;
  right: string | number;
}) {
  const { makeRoadLayer, makeGeneralMap } = useMobileDanjiMap();

  return (
    <>
      {type === 'map' && (
        <StyledDiv
          tw="absolute p-2.5 [z-index: 100] [transform: translate3d(0,0,0)] bg-white [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)] [border-radius: 8px] cursor-pointer hover:border-gray-1000 hover:border-b hover:border-l hover:border-r hover:border-t"
          style={{ bottom, right }}
          onClick={() => makeRoadLayer()}
        >
          <DanjiRoadView />
        </StyledDiv>
      )}

      {type === 'roadlayer' && (
        <StyledDiv
          tw="absolute p-2.5 [z-index: 100] [transform: translate3d(0,0,0)] bg-white [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)] [border-radius: 8px] cursor-pointer hover:border-gray-1000 hover:border-b hover:border-l hover:border-r hover:border-t"
          style={{ bottom, right }}
          onClick={() => makeGeneralMap()}
        >
          <DanjiRoadView />
        </StyledDiv>
      )}

      {type === 'road' && (
        <StyledDiv
          tw="absolute px-2 py-1 [z-index: 100] [transform: translate3d(0,0,0)] [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)] [border-radius: 8px] cursor-pointer bg-white [font-size: 12px] font-bold hover:border-gray-1000 hover:border-b hover:border-l hover:border-r hover:border-t"
          style={{ bottom, right }}
          onClick={() => makeGeneralMap()}
        >
          지도
        </StyledDiv>
      )}
    </>
  );
}
