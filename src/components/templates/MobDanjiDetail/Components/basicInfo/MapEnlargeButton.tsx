import MapCloseIcon from '@/assets/icons/map_close.svg';
import MapEnlargeIcon from '@/assets/icons/map_enlarge.svg';
import { styled } from 'twin.macro';

const StyledDiv = styled.div``;

export function MapClose({
  handleReset,
  top,
  right,
}: {
  handleReset: () => void;
  top: string | number;
  right: string | number;
}) {
  return (
    <StyledDiv
      tw="absolute p-2.5 bg-white [z-index: 100] [transform: translate3d(0,0,0)] [border-radius: 8px] [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)] cursor-pointer hover:border-gray-1000 hover:border-b hover:border-l hover:border-r hover:border-t"
      style={{ top, right }}
      onClick={handleReset}
    >
      <MapCloseIcon />
    </StyledDiv>
  );
}

export function MapEnlarge({
  handleEnlarge,
  top,
  right,
}: {
  handleEnlarge: () => void;
  top: string | number;
  right: string | number;
}) {
  return (
    <StyledDiv
      tw="absolute p-2.5 bg-white [z-index: 100] [transform: translate3d(0,0,0)] [border-radius: 8px] [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)] cursor-pointer hover:border-gray-1000 hover:border-b hover:border-l hover:border-r hover:border-t"
      style={{ top, right }}
      onClick={handleEnlarge}
    >
      <MapEnlargeIcon />
    </StyledDiv>
  );
}
