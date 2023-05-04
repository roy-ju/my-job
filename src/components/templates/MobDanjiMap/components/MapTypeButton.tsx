import { useDanjiMapTypeStore } from '@/states/mob/danjiMapTypeStore';
import DanjiRoadView from '@/assets/icons/danji_roadview.svg';
import { styled } from 'twin.macro';

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
  const danjiMapTypeStore = useDanjiMapTypeStore();

  return (
    <>
      {type === 'map' && (
        <StyledDiv
          tw="absolute p-2.5 [z-index: 100] [transform: translate3d(0,0,0)] bg-white [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)] [border-radius: 8px] cursor-pointer hover:border-gray-1000 hover:border-b hover:border-l hover:border-r hover:border-t"
          style={{ bottom, right }}
          onClick={() => danjiMapTypeStore.makeRoadLayer()}
        >
          <DanjiRoadView />
        </StyledDiv>
      )}

      {type === 'roadlayer' && (
        <StyledDiv
          tw="absolute p-2.5 [z-index: 100] [transform: translate3d(0,0,0)] bg-white [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)] [border-radius: 8px] cursor-pointer hover:border-gray-1000 hover:border-b hover:border-l hover:border-r hover:border-t"
          style={{ bottom, right }}
          onClick={() => danjiMapTypeStore.makeGeneralMap()}
        >
          <DanjiRoadView />
        </StyledDiv>
      )}

      {type === 'road' && (
        <StyledDiv
          tw="absolute p-2.5 [z-index: 100] [transform: translate3d(0,0,0)] [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)] [border-radius: 8px] cursor-pointer hover:border-gray-1000 hover:border-b hover:border-l hover:border-r hover:border-t"
          style={{ bottom, right }}
          onClick={() => danjiMapTypeStore.makeGeneralMap()}
        >
          지도로 보기
        </StyledDiv>
      )}
    </>
  );
}
