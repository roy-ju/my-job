import React, { ChangeEventHandler, ReactNode, useCallback, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import tw, { theme } from 'twin.macro';

import { usePopper } from 'react-popper';

import { Button, Label, Radio } from '@/components/atoms';

import { ButtonGroup, RadioGroup } from '@/components/molecules';

import useOutsideClick from '@/hooks/useOutsideClick';

import SchoolIcon from '@/assets/icons/school.svg';

import StackIcon from '@/assets/icons/stack.svg';

import MapPinRoad from '@/assets/icons/map_pin_road.svg';

import NaverMapPin from '@/assets/icons/naver_map_pin.svg';

import PlusIcon from '@/assets/icons/plus.svg';

import MinusIcon from '@/assets/icons/minus.svg';

import GPSIcon from '@/assets/icons/gps.svg';

import animationData from '@/assets/icons/json/loading.json';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

interface OnClickProps {
  onClick?: () => void;
}

interface SelectableProps extends OnClickProps {
  selected?: boolean;
  isGeoLoading?: boolean;
}

const ButtonText = tw.div`text-info text-gray-1000 mt-1`;

interface MapButtonProps extends SelectableProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function MapButton({ selected = false, value, onChange, onClick }: MapButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'left-start',
  });

  const outsideRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: outsideRef,
    enabled: isOpen,
    handler: () => {
      setIsOpen(false);
    },
  });

  const handleButtonClick = useCallback(() => {
    onClick?.();
    setIsOpen((prev) => !prev);
  }, [onClick]);

  return (
    <>
      <Button
        ref={setReferenceElement}
        onClick={handleButtonClick}
        tw="flex-col w-10 h-14 hover:bg-gray-300"
        style={{ backgroundColor: selected ? theme`colors.nego.800` : 'white' }}
      >
        <NaverMapPin color={selected ? 'white' : theme`colors.gray.1000`} />
        <ButtonText tw="font-bold text-gray-1000" css={[selected && tw`text-white`]}>
          지도
        </ButtonText>
      </Button>
      {isOpen && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <div ref={outsideRef}>
            <RadioGroup
              value={value}
              onChange={onChange}
              tw="w-[119px] flex flex-col bg-white mr-2 rounded-lg shadow gap-4 p-4"
            >
              <Label control={<Radio />} value="normal" label="일반지도" />
              <Label control={<Radio />} value="satellite" label="위성지도" />
              <Label control={<Radio />} value="terrain" label="지형지도" />
            </RadioGroup>
          </div>
        </div>
      )}
    </>
  );
}

function StreetViewButton({ selected = false, onClick }: SelectableProps) {
  return (
    <Button
      onClick={onClick}
      tw="flex-col w-10 h-14 hover:bg-gray-300"
      style={{ backgroundColor: selected ? theme`colors.nego.800` : 'white' }}
    >
      <MapPinRoad color={selected ? 'white' : theme`colors.gray.1000`} />
      <ButtonText tw="font-bold text-gray-1000" css={[selected && tw`text-white`]}>
        로드
      </ButtonText>
    </Button>
  );
}

function CadastralButton({ selected = false, onClick }: SelectableProps) {
  return (
    <Button
      onClick={onClick}
      tw="flex-col w-10 h-14 hover:bg-gray-300"
      style={{ backgroundColor: selected ? theme`colors.nego.800` : 'white' }}
    >
      <StackIcon color={selected ? 'white' : theme`colors.gray.1000`} />
      <ButtonText tw="font-bold text-gray-1000" css={[selected && tw`text-white`]}>
        지적
      </ButtonText>
    </Button>
  );
}

interface SchoolButtonProps extends SelectableProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function SchoolButton({ selected = false, value, onChange, onClick }: SchoolButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'left-start',
  });

  const outsideRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: outsideRef,
    enabled: isOpen,
    handler: () => {
      setIsOpen(false);
    },
  });

  const handleButtonClick = useCallback(() => {
    onClick?.();
    setIsOpen((prev) => !prev);
  }, [onClick]);

  return (
    <>
      <Button
        ref={setReferenceElement}
        onClick={handleButtonClick}
        tw="flex-col w-10 h-14 hover:bg-gray-300"
        style={{ backgroundColor: selected ? theme`colors.nego.800` : 'white' }}
      >
        <SchoolIcon color={selected ? 'white' : theme`colors.gray.1000`} />
        <ButtonText tw="font-bold text-gray-1000" css={[selected && tw`text-white`]}>
          학교
        </ButtonText>
      </Button>
      {isOpen && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <div ref={outsideRef}>
            <RadioGroup
              value={value}
              onChange={(e) => {
                setIsOpen(false);
                onChange?.(e);
              }}
              tw="w-[119px] flex flex-col bg-white mr-2 rounded-lg shadow gap-4 p-4"
            >
              <Label control={<Radio />} value="none" label="선택 해제" />
              <Label control={<Radio />} value="elementary" label="초등학교" />
              <Label control={<Radio />} value="middle" label="중학교" />
              <Label control={<Radio />} value="high" label="고등학교" />
            </RadioGroup>
          </div>
        </div>
      )}
    </>
  );
}

function ZoomInButton({ onClick }: OnClickProps) {
  return (
    <Button onClick={onClick} tw="flex-col w-10 h-10 hover:bg-gray-300">
      <PlusIcon />
    </Button>
  );
}

function ZoomOutButton({ onClick }: OnClickProps) {
  return (
    <Button onClick={onClick} tw="flex-col w-10 h-10 hover:bg-gray-300">
      <MinusIcon />
    </Button>
  );
}

function GPSButton({ selected = false, onClick, isGeoLoading }: SelectableProps) {
  return (
    <Button
      onClick={() => {
        if (!isGeoLoading) {
          onClick?.();
        }
      }}
      variant="ghost"
      size="none"
      tw="flex-col w-10 h-10 bg-white shadow hover:bg-gray-300"
      selected={selected}
      style={{
        backgroundColor: selected ? theme`colors.nego.800` : 'white',
      }}
    >
      {!isGeoLoading && <GPSIcon color={selected ? 'white' : theme`colors.gray.1000`} />}

      {isGeoLoading && (
        <div tw="flex items-center justify-center">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={80}
            width={80}
          />
        </div>
      )}
    </Button>
  );
}

function Group({ children }: { children?: ReactNode }) {
  return (
    <ButtonGroup separated variant="ghost" orientation="vertical" size="none" tw="bg-white rounded-lg shadow">
      {children}
    </ButtonGroup>
  );
}

function Wrraper() {
  return null;
}

export default Object.assign(Wrraper, {
  Group,
  MapButton,
  StreetViewButton,
  CadastralButton,
  SchoolButton,
  ZoomInButton,
  ZoomOutButton,
  GPSButton,
});
