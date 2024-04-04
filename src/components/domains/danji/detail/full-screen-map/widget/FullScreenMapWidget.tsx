import { ChangeEventHandler, useCallback } from 'react';

import tw, { styled, theme } from 'twin.macro';

import Button from '@/components/atoms/Button';

import MapPinRoad from '@/assets/icons/map_pin_road.svg';

import NaverMapPin from '@/assets/icons/naver_map_pin.svg';

interface OnClickProps {
  onClick?: () => void;
}

interface SelectableProps extends OnClickProps {
  selected?: boolean;
}

interface MapButtonProps extends SelectableProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const ButtonText = tw.div`text-info text-gray-1000 mt-1`;

export function StreetViewButton({ selected = false, onClick }: SelectableProps) {
  return (
    <Button onClick={onClick} tw="flex-col w-10 h-14 hover:bg-gray-300">
      <MapPinRoad color={selected ? theme`colors.nego.1000` : theme`colors.gray.800`} />
      <ButtonText css={[selected && tw`font-bold text-nego-1000`]}>로드</ButtonText>
    </Button>
  );
}

export function MapButton({ selected = false, onClick }: MapButtonProps) {
  const handleButtonClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <>
      <Button onClick={handleButtonClick} tw="flex-col w-10 h-14 hover:bg-gray-300">
        <NaverMapPin color={selected ? theme`colors.nego.1000` : theme`colors.gray.800`} />
        <ButtonText css={[selected && tw`font-bold text-nego-1000`]}>지도</ButtonText>
      </Button>
    </>
  );
}

export const FullScreenMapFlexContents = styled.div`
  ${tw`relative flex-1 w-full`}
`;

export const MapControlsWrraper = styled.div`
  ${tw`absolute [top: 12px] [right: 16px] [z-index: 10000] [transform: translate3d(0, 0, 0)]`}
`;
