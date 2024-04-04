import tw, { styled } from 'twin.macro';

import useMobileDanjiMap from '@/states/hooks/useMobileDanjiMap';

import DanjiRoadView from '@/assets/icons/danji_roadview.svg';

type Props = {
  isIconButton: boolean;
};

const StyledDiv = styled.div<Props>`
  ${tw`absolute [z-index: 100] [transform: translate3d(0,0,0)] bg-white [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)] [border-radius: 8px] cursor-pointer hover:border-gray-1000 hover:border-b hover:border-l hover:border-r hover:border-t`}
  ${({ isIconButton }) => (isIconButton ? tw`p-2.5` : tw`px-2 py-1 [font-size: 12px] font-bold`)}
`;

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
        <StyledDiv isIconButton style={{ bottom, right }} onClick={() => makeRoadLayer()}>
          <DanjiRoadView />
        </StyledDiv>
      )}

      {type === 'roadlayer' && (
        <StyledDiv isIconButton style={{ bottom, right }} onClick={() => makeGeneralMap()}>
          <DanjiRoadView />
        </StyledDiv>
      )}

      {type === 'road' && (
        <StyledDiv isIconButton={false} style={{ bottom, right }} onClick={() => makeGeneralMap()}>
          지도
        </StyledDiv>
      )}
    </>
  );
}
