import tw, { styled } from 'twin.macro';

import MapEnlargeIcon from '@/assets/icons/map_enlarge.svg';

type MapEnlargeProps = {
  handleEnlarge: () => void;
  top: string | number;
  right: string | number;
};

const StyledDiv = styled.div`
  ${tw`absolute p-2.5 bg-white [z-index: 100] [transform: translate3d(0,0,0)] [border-radius: 8px] [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)] cursor-pointer hover:border-gray-1000 hover:border-b hover:border-l hover:border-r hover:border-t`}
`;

export default function MapEnlarge({ handleEnlarge, top, right }: MapEnlargeProps) {
  return (
    <StyledDiv style={{ top, right }} onClick={handleEnlarge}>
      <MapEnlargeIcon />
    </StyledDiv>
  );
}
